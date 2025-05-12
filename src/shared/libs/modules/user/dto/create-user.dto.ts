import { UserType } from '../../../../enums/index.js';

export class CreateUserDto {
  public name!: string;
  public email!: string;
  public avatarImage!: string;
  public password!: string;
  public userType!: UserType;
}
