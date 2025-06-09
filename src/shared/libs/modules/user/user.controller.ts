import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { Logger } from 'pino';

import { CreateUserDto , LoginUserDto } from './dto/index.js';
import { UserService } from './index.js';
import { LoginUserRdo } from './rdo/index.js';
import { CreateUserRequest , LoginUserRequest } from './type/index.js';
import { fillDto } from '../../../helpers/index.js';
import { Component } from '../../../types/index.js';
import { Config, RestSchema } from '../../config/index.js';
import { BaseController } from '../../rest/controller/index.js';
import { HttpError } from '../../rest/errors/index.js';
import { PrivateRouteMiddleware , ValidateDtoMiddleware } from '../../rest/middleware/index.js';
import { HttpMethod } from '../../rest/types/index.js';
import { AuthService } from '../auth/index.js';

@injectable()
export class UserController extends BaseController {
  private readonly salt!: string;

  constructor(
    @inject(Component.PinoLogger) protected readonly logger: Logger,
    @inject(Component.DefaultUserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.AuthService) private readonly authService: AuthService
  ) {
    super(logger);

    this.salt = this.config.get('SALT');

    this.logger.info('Регистрация маршрутов для контроллера пользователей');

    this.addRoute({
      path: '/create',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware(CreateUserDto)
      ]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [
        new ValidateDtoMiddleware(LoginUserDto)
      ]
    });
    this.addRoute({
      path: '/logout',
      method: HttpMethod.Post,
      handler: this.logout,
      middlewares: [new PrivateRouteMiddleware()]
    });
    this.addRoute({
      path: '/check',
      method: HttpMethod.Get,
      handler: this.check,
      middlewares: [new PrivateRouteMiddleware()]
    });
  }

  public async create(
    req: CreateUserRequest,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(req.body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${req.body.email}» exists.`,
        'UserController'
      );
    }

    await this.userService.create(req.body, this.salt);
    this.created(res, {});
  }

  public async login(
    { body }: LoginUserRequest,
    res: Response
  ): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    const responseData = fillDto(LoginUserRdo, {
      name: user.name,
      email: user.email,
      token,
    });
    this.ok(res, responseData);
  }

  public async logout(
    { tokenPayload: { email }}: Request,
    res: Response
  ): Promise<void> {
    const foundedUser = await this.userService.findByEmail(email);

    if (! foundedUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.noContent(res, {});
  }

  public async check({ tokenPayload: { email }}: Request, res: Response) {
    const foundedUser = await this.userService.findByEmail(email);

    if (! foundedUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.ok(res, fillDto(LoginUserRdo, foundedUser));
  }
}
