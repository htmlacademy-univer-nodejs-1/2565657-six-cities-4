import { User, City, Location } from './index.js';
import {
  Rating,
  PlaceType,
  RoomCount,
  GuestCount,
  Convenience,
} from '../enums/index.js';

export type Offer = {
  title: string;
  description: string;
  publicationDate: Date;
  city: City;
  preview: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: Rating;
  placeType: PlaceType;
  roomCount: RoomCount;
  guestCount: GuestCount;
  price: number;
  conveniences: Convenience[];
  offerAuthor: User;
  commentCount: number;
  location: Location;
};
