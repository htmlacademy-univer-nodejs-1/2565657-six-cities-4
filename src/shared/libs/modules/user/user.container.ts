import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';

import { DefaultUserService } from './default-user.service.js';
import { UserService } from './user-service.interface.js';
import { UserEntity, UserModel } from './user.entity.js';
import { ComponentName } from '../../../enums/index.js';

export function createUserContainer() {
  const userContainer = new Container();
  userContainer.bind<UserService>(ComponentName.UserService).to(DefaultUserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(ComponentName.UserModel).toConstantValue(UserModel);

  return userContainer;
}
