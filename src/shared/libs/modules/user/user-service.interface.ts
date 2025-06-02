import { DocumentType } from '@typegoose/typegoose';

import { CreateUserDto, UserEntity, UpdatedUserDto } from './index.js';

export interface UserService {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  updateById(userId: string, dto: UpdatedUserDto): Promise<DocumentType<UserEntity> | null>;
  find(): Promise<DocumentType<UserEntity>[]>;
}
