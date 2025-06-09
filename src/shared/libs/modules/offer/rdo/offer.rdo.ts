import { Expose, Type } from 'class-transformer';

import { CityRdo } from './city.rdo.js';
import { LocationRdo } from './location.rdo.js';
import { PlaceType, Rating } from '../../../../enums/index.js';
import { UserRdo } from '../../user/rdo/index.js';

export class OfferRdo {
  @Expose({ name: 'id' })
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  @Type(() => CityRdo)
  public city!: CityRdo;

  @Expose()
  public preview!: string;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public rating!: Rating;

  @Expose()
  public placeType!: PlaceType;

  @Expose()
  public price!: number;

  @Expose({ name: 'id' })
  @Type(() => UserRdo)
  public offerAuthor!: UserRdo;

  @Expose()
  @Type(() => LocationRdo)
  public location!: LocationRdo;
}
