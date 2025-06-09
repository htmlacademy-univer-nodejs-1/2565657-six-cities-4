import { Config } from 'convict';
import { inject, injectable } from 'inversify';
import { SignJWT } from 'jose';
import { Logger } from 'pino';

import { LoginUserDto } from '../user/dto/index.js';
import { UserEntity, UserService } from '../user/index.js';
import { UserNotFoundException , UserPasswordIncorrectException } from './errors/index.js';
import { JWT_ALGORITHM, JWT_EXPIRED , AuthService , TokenPayload } from './index.js';
import { Component } from '../../../types/index.js';
import { RestSchema } from '../../config/index.js';
import * as crypto from 'node:crypto';


@injectable()
export class DefaultAuthService implements AuthService {
  constructor(
    @inject(Component.PinoLogger) private readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) {}

  public async authenticate(user: UserEntity): Promise<string> {
    const jwtSecret = this.config.get('JWT_SECRET');
    const secretKey = crypto.createSecretKey(jwtSecret, 'utf-8');
    const tokenPayload: TokenPayload = {
      name: user.name,
      email: user.email,
      avatarImage: user.avatarImage,
      id: user.id,
      userType: user.userType
    };

    this.logger.info(`Создан токен для ${user.email}`);
    return new SignJWT(tokenPayload)
      .setProtectedHeader({ alg: JWT_ALGORITHM })
      .setIssuedAt()
      .setExpirationTime(JWT_EXPIRED)
      .sign(secretKey);
  }

  public async verify(dto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userService.findByEmail(dto.email);
    if (! user) {
      this.logger.warn(`Пользователь с таким email не найден: ${dto.email}`);
      throw new UserNotFoundException();
    }

    if (! user.verifyPassword(dto.password, this.config.get('SALT'))) {
      this.logger.warn(`Неправильный пароль от ${dto.email}`);
      throw new UserPasswordIncorrectException();
    }

    return user;
  }
}
