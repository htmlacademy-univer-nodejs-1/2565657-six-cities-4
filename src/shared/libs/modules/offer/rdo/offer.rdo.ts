import { Ref } from '@typegoose/typegoose';
import { Expose } from 'class-transformer';

import { Convenience, GuestCount, PlaceType, RoomCount } from '../../../../enums/index.js';
import { City, Location } from '../../../../types/index.js';
import { UserEntity } from '../../user/index.js';

export class OfferRdo {
  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public city!: City;

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

  @Expose()
  public offerAuthor!: Ref<UserEntity>;

  @Expose()
  public location!: Location;
}
