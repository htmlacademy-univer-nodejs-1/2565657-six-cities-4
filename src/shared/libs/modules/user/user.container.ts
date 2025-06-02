import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';

import { UserEntity, UserModel, UserService, DefaultUserService } from './index.js';
import { Component } from '../../../types/index.js';

export function createUserContainer() {
  const userContainer = new Container();
  userContainer.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
  userContainer.bind<UserService>(Component.DefaultUserService).to(DefaultUserService).inSingletonScope();

  return userContainer;
}
