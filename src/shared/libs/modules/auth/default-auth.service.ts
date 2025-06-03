import { Config } from 'convict';
import { inject, injectable } from 'inversify';
import { SignJWT } from 'jose';
import { Logger } from 'pino';

import { AuthService } from './auth-service.interface.js';
import { JWT_ALGORITHM, JWT_EXPIRED } from './auth.constants.js';
import { LoginUserDto } from '../user/dto/login-user.dto.js';
import { UserEntity, UserService } from '../user/index.js';
import { UserNotFoundException } from './errors/user-not-found.exception.js';
import { UserPasswordIncorrectException } from './errors/user-password-incorrect.exception.js';
import { TokenPayload } from './type/token-payload.js';
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

    this.logger.info(`Create token for ${user.email}`);
    return new SignJWT(tokenPayload)
      .setProtectedHeader({ alg: JWT_ALGORITHM })
      .setIssuedAt()
      .setExpirationTime(JWT_EXPIRED)
      .sign(secretKey);
  }

  public async verify(dto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userService.findByEmail(dto.email);
    if (! user) {
      this.logger.warn(`User with ${dto.email} not found`);
      throw new UserNotFoundException();
    }

    if (! user.verifyPassword(dto.password, this.config.get('SALT'))) {
      this.logger.warn(`Incorrect password for ${dto.email}`);
      throw new UserPasswordIncorrectException();
    }

    return user;
  }
}
