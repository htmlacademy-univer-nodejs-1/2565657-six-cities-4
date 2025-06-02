import { Ref } from '@typegoose/typegoose';

import { Convenience, GuestCount, PlaceType, RoomCount } from '../../../../enums/index.js';
import { City, Location } from '../../../../types/index.js';
import { UserEntity } from '../../user/index.js';

export class CreateOfferDto {
  public title!: string;
  public description!: string;
  public publicationDate: Date;
  public city!: City;
  public preview!: string;
  public images!: string[];
  public isPremium!: boolean;
  public placeType!: PlaceType;
  public roomCount!: RoomCount;
  public guestCount!: GuestCount;
  public price!: number;
  public conveniences!: Convenience[];
  public offerAuthor!: Ref<UserEntity>;
  public location!: Location;
}
