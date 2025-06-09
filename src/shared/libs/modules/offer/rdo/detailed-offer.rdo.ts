import { Expose, Type } from 'class-transformer';

import { CityRdo , LocationRdo } from './index.js';
import { Convenience, GuestCount, PlaceType, Rating, RoomCount } from '../../../../enums/index.js';
import { UserRdo } from '../../user/rdo/index.js';

export class DetailedOfferRdo {
  @Expose({ name: 'id' })
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose({ name: 'createdAt'})
  public publicationDate!: Date;

  @Expose()
  @Type(() => CityRdo)
  public city!: CityRdo;

  @Expose()
  public preview!: string;

  @Expose()
  public images!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public rating!: Rating;

  @Expose()
  public placeType!: PlaceType;

  @Expose()
  public roomCount!: RoomCount;

  @Expose()
  public guestCount!: GuestCount;

  @Expose()
  public price!: number;

  @Expose()
  public conveniences!: Convenience[];

  @Expose({ name: 'id' })
  @Type(() => UserRdo)
  public offerAuthor!: UserRdo;

  @Expose()
  public commentCount!: number;

  @Expose()
  @Type(() => LocationRdo)
  public location!: LocationRdo;
}
