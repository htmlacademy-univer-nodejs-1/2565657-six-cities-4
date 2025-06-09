import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';

import { UserType } from '../../../enums/index.js';
import { generateSHA256 } from '../../../helpers/index.js';
import { User } from '../../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

const DEFAULT_AVATAR_IMAGE = '/assets/empty-avatar.jpg';

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({
    required: true,
    minlength: [1, 'Имя должно состоять хотя бы из 1 символа'],
    maxlength: [15, 'Имя не должно превышать 15 символов'],
    trim: true
  })
  public name: string;

  @prop({
    required: true,
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Введите корректный email'],
    trim: true
  })
  public email: string;

  @prop({
    required: false,
    default: DEFAULT_AVATAR_IMAGE,
    match: [/\.(jpg|png)$/i, 'Автарка должна быть в формате JPEG или PNG']
  })
  public avatarImage: string;

  @prop({
    required: true
  })
  public password: string;

  @prop({
    required: true,
    type: () => [String],
    enum: UserType,
    default: 'Common',
  })
  public userType: UserType;

  constructor(userData: User) {
    super();
    this.name = userData.name;
    this.email = userData.email;
    this.avatarImage = userData.avatarImage || DEFAULT_AVATAR_IMAGE;
    this.userType = userData.userType;
    this.password = '';
  }

  public setPassword(password: string, salt: string) {
    this.password = generateSHA256(password, salt);
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = generateSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
