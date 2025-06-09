import { IsInt, Max, MaxLength, Min, MinLength } from 'class-validator';

import { UpdateOfferMessage } from './index.js';
import { Convenience, GuestCount, PlaceType, RoomCount } from '../../../../enums/index.js';
import { City, Location } from '../../../../types/index.js';

export class UpdateOfferDto {
  @MinLength(10, { message: UpdateOfferMessage.title.minLength })
  @MaxLength(100, { message: UpdateOfferMessage.title.maxLength })
  public title?: string;

  @MinLength(20, { message: UpdateOfferMessage.description.minLength })
  @MaxLength(1024, { message: UpdateOfferMessage.description.maxLength })
  public description?: string;

  public city?: City;

  @MaxLength(256, { message: UpdateOfferMessage.preview.maxLength })
  public preview?: string;

  public images?: string[];
  public isPremium?: boolean;
  public placeType?: PlaceType;
  public roomCount?: RoomCount;
  public guestCount?: GuestCount;

  @IsInt({ message: UpdateOfferMessage.price.invalidFormat })
  @Min(100, { message: UpdateOfferMessage.price.minValue })
  @Max(100000, { message: UpdateOfferMessage.price.maxValue })
  public price?: number;

  public conveniences?: Convenience[];
  public location?: Location;
}
