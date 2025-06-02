import { Expose } from 'class-transformer';

import { UserType } from '../../../../enums/index.js';

export class UserRdo {
  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public avatarImage: string;

  @Expose()
  public userType: UserType;
}
