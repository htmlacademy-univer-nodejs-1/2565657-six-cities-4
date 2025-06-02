import { Ref } from '@typegoose/typegoose';

import { City, Location } from './index.js';
import {
  Rating,
  PlaceType,
  RoomCount,
  GuestCount,
  Convenience,
} from '../enums/index.js';
import { UserEntity } from '../libs/modules/user/index.js';

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
  offerAuthor: Ref<UserEntity>;
  commentCount: number;
  location: Location;
};
