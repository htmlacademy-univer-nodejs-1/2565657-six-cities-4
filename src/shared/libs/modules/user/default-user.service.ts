import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { UserService, UpdatedUserDto, CreateUserDto, UserEntity } from './index.js';
import { Component } from '../../../types/index.js';
import { Logger } from '../../logger/index.js';

@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(Component.PinoLogger) private readonly logger: Logger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`Появился новый пользователь, его email ${user.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      return existedUser;
    }

    return this.create(dto, salt);
  }

  public async updateById(userId: string, dto: UpdatedUserDto): Promise<DocumentType<UserEntity> | null> {
    return this.userModel
      .findByIdAndUpdate(userId, dto, { new: true })
      .exec();
  }

  public async find(): Promise<DocumentType<UserEntity>[]> {
    return this.userModel.find().exec();
  }
}
