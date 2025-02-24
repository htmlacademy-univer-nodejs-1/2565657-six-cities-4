import {UserType} from '../enums/user-type.js';

export type User = {
  name: string,
  email: string,
  avatarImage?: string,
  password: string,
  userType: UserType
}
