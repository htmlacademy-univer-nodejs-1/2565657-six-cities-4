import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';

import { UserEntity, UserModel, UserService, DefaultUserService , UserController } from './index.js';
import { Component } from '../../../types/index.js';
import { Controller } from '../../rest/controller/index.js';

export function createUserContainer() {
  const userContainer = new Container();
  userContainer.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
  userContainer.bind<UserService>(Component.DefaultUserService).to(DefaultUserService).inSingletonScope();
  userContainer.bind<Controller>(Component.UserController).to(UserController).inSingletonScope();

  return userContainer;
}
