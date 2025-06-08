import { UserType } from '../enums/index.js';

export type User = {
  name: string;
  email: string;
  avatarImage: string;
  password: string;
  userType: UserType;
};
