import {City} from './city.js';
import {Rating} from '../enums/rating.js';
import {HousingType} from '../enums/housing-type.js';
import {RoomCount} from '../enums/room-count.js';
import {GuestCount} from '../enums/guest-count.js';
import {Convenience} from '../enums/convenience.js';
import {User} from './user.js';
import {Location} from './location.js';

export type Offer = {
  title: string,
  description: string,
  publicationDate: string,
  city: City,
  preview: string,
  images: string[],
  isPremium: boolean,
  isFavorite: boolean,
  rating: Rating,
  housing: HousingType,
  roomCount: RoomCount,
  guestCount: GuestCount,
  price: number,
  conveniences: Convenience[],
  offerAuthor: User,
  commentCount: number,
  location: Location
}
