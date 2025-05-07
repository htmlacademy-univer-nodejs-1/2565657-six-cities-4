import {User} from '../types/index.js';
import {UserType} from '../enums/user-type.js';

export const generateUser = (
  name: string,
  email: string,
  avatarImage: string,
  password: string,
  userType: string
): User => ({
  name,
  email,
  avatarImage,
  password,
  userType: getUserType(userType),
});

function getUserType(name: string): UserType {
  const cityNameKey = (Object.keys(UserType) as (keyof typeof UserType)[]).find(
    (key) => key === name
  );

  if (cityNameKey) {
    return UserType[cityNameKey];
  } else {
    return UserType.Common;
  }
}
