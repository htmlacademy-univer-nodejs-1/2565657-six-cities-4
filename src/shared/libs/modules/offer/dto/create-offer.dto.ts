import { Location } from '../../../../types/index.js';

export class CreateOfferDto {
  public title!: string;
  public description!: string;
  public city!: string;
  public previewImage!: string;
  public images!: string[];
  public isPremium!: boolean;
  public isFavorite!: boolean;
  public placeType!: string;
  public rating!: number;
  public roomCount!: number;
  public guestCount!: number;
  public price!: number;
  public conveniences!: string[];
  public offerAuthor!: string;
  public commentCount!: number;
  public location!: Location;
}
