import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { Logger } from 'pino';

import { CreateUserRequest } from './create-user-request.type.js';
import { LoginUserRequest } from './login-user-request.type.js';
import { UserRdo } from './rdo/user.rdo.js';
import { UserService } from './user-service.interface.js';
import { fillDto } from '../../../helpers/index.js';
import { Component } from '../../../types/index.js';
import { Config, RestSchema } from '../../config/index.js';
import { BaseController, HttpError, HttpMethod } from '../../rest/index.js';

@injectable()
export class UserController extends BaseController {
  private readonly salt!: string;

  constructor(
    @inject(Component.PinoLogger) protected readonly logger: Logger,
    @inject(Component.DefaultUserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly config: Config<RestSchema>
  ) {
    super(logger);

    this.salt = this.config.get('SALT');

    this.logger.info('Регистрирация маршрутов для контроллера пользователей');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/create', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/login', method: HttpMethod.Post, handler: this.login });
  }

  public async index(_req: Request, res: Response) {
    const users = await this.userService.find();
    const responseData = fillDto(UserRdo, users);
    this.ok(res, responseData);
  }

  public async create(
    req: CreateUserRequest,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    const existedUser = await this.userService.findByEmail(req.body.email);

    if (existedUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `Пользователь с таким email уже существует: ${req.body.email}`,
        'UserController'
      );
    }

    const result = await this.userService.create(req.body, this.salt);
    this.created(res, fillDto(UserRdo, result));
  }

  public async login(
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
}
