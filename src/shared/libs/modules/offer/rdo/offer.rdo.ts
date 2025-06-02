import { Expose, Type } from 'class-transformer';

import { CityRdo } from './city.rdo.js';
import { LocationRdo } from './location.rdo.js';
import { Convenience, GuestCount, PlaceType, RoomCount } from '../../../../enums/index.js';
import { UserRdo } from '../../user/rdo/user.rdo.js';

export class OfferRdo {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

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
  @Type(() => LocationRdo)
  public location!: LocationRdo;
}
