import { City, Location, User } from './index.js';
import {
  Rating,
  PlaceType,
} from '../enums/index.js';

export type Offer = {
  id: string;
  title: string;
  city: City;
  preview: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: Rating;
  placeType: PlaceType;
  price: number;
  offerAuthor: User;
  location: Location;
};
