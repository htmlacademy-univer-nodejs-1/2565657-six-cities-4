import { UserType } from '../../../../enums/index.js';

export type TokenPayload = {
  name: string
  email: string;
  avatarImage: string;
  id: string;
  userType: UserType
};
