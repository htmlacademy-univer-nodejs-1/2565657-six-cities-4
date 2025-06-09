import { DocumentType } from '@typegoose/typegoose';

import { CreateUserDto } from './dto/index.js';
import { UserEntity } from './index.js';

export interface UserService {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  find(): Promise<DocumentType<UserEntity>[]>;
}
