import { Ref } from '@typegoose/typegoose';

import { City, Location } from './index.js';
import {
  Rating,
  PlaceType,
} from '../enums/index.js';
import { UserEntity } from '../libs/modules/user/index.js';

export type Offer = {
  title: string;
  city: City;
  preview: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: Rating;
  placeType: PlaceType;
  price: number;
  offerAuthor: Ref<UserEntity>;
  location: Location;
};
