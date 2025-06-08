import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { Logger } from 'pino';

import { CreateUserDto } from './dto/create-user.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import { LoginUserRdo } from './rdo/login-user.rdo.js';
import { CreateUserRequest } from './type/create-user-request.type.js';
import { LoginUserRequest } from './type/login-user-request.type.js';
import { UserService } from './user-service.interface.js';
import { fillDto } from '../../../helpers/index.js';
import { Component } from '../../../types/index.js';
import { Config, RestSchema } from '../../config/index.js';
import { BaseController, HttpError, HttpMethod } from '../../rest/index.js';
import { PrivateRouteMiddleware } from '../../rest/middleware/private-route.middleware.js';
import { ValidateDtoMiddleware } from '../../rest/middleware/validate-dto.middleware.js';
import { AuthService } from '../auth/auth-service.interface.js';

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
    await this.userService.findOrCreate(req.body, this.salt);
    this.created(res, {});
  }

  public async login(
    { body }: LoginUserRequest,
    res: Response
  ): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    const responseData = fillDto(LoginUserRdo, {
      email: user.email,
      token,
    });
    this.ok(res, responseData);
  }

  public async logout(
    req: LoginUserRequest,
    _res: Response
  ): Promise<void> {
    const existedUser = await this.userService.findByEmail(req.body.email);

    if (!existedUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `Пользователь с таким email не найден: ${req.body.email}`,
        'UserController'
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Не реализовано',
      'UserController'
    );
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
