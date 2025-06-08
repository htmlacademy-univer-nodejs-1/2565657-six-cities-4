import { Expose, Type } from 'class-transformer';

import { Rating } from '../../../../enums/index.js';
import { UserRdo } from '../../user/rdo/user.rdo.js';

export class CommentRdo {
  @Expose()
  public text!: string;

  @Expose({ name: 'createdAt'})
  public publicationDate!: string;

  @Expose()
  public rating!: Rating;

  @Expose({ name: 'userId'})
  @Type(() => UserRdo)
  public user: UserRdo;
}
