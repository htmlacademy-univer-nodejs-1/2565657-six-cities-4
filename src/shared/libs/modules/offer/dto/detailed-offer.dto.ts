import { Location } from '../../../../types/index.js';

export class DetailedOfferDto {
  public id!: string;
  public title!: string;
  public description!: string;
  public publicationDate!: Date;
  public city!: string;
  public preview!: string;
  public images!: string[];
  public isPremium!: boolean;
  public isFavorite!: boolean;
  public rating!: number;
  public placeType!: string;
  public roomCount!: number;
  public guestCount!: number;
  public price!: number;
  public conveniences!: string[];
  public offerAuthor!: string;
  public commentCount!: number;
  public location!: Location;
}
