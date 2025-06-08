import { IsInt, Max, MaxLength, Min, MinLength } from 'class-validator';

import { CreateOfferValidationMessage } from './create-offer-messages.js';
import { Convenience, GuestCount, PlaceType, RoomCount } from '../../../../enums/index.js';
import { City, Location } from '../../../../types/index.js';

export class CreateOfferDto {
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title!: string;

  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description!: string;

  public city!: City;

  @MaxLength(256, { message: CreateOfferValidationMessage.preview.maxLength })
  public preview!: string;

  public images!: string[];
  public isPremium!: boolean;
  public placeType!: PlaceType;
  public roomCount!: RoomCount;
  public guestCount!: GuestCount;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.price.maxValue })
  public price!: number;

  public conveniences!: Convenience[];
  public location!: Location;
}
