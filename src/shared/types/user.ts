import { UserType } from '../enums/index.js';

export type User = {
  id: string;
  name: string;
  email: string;
  avatarImage: string;
  password: string;
  userType: UserType;
};
