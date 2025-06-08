import { IsEmail, IsString, Length } from 'class-validator';

import { CreateUserMessages } from './create-user.messages.js';
import { UserType } from '../../../../enums/index.js';

export class CreateUserDto {
  @IsString({ message: CreateUserMessages.name.invalidFormat })
  @Length(1, 15, { message: CreateUserMessages.name.lengthField })
  public name!: string;

  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email!: string;

  @IsString({ message: CreateUserMessages.avatarImage.invalidFormat })
  public avatarImage!: string;

  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(6, 12, { message: CreateUserMessages.password.lengthField })
  public password!: string;

  public userType!: UserType;
}
