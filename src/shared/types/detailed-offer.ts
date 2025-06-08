import { Offer } from './index.js';
import { Convenience, GuestCount, RoomCount } from '../enums/index.js';

export type DetailedOffer = Offer & {
  description: string;
  publicationDate: Date;
  images: string[];
  roomCount: RoomCount;
  guestCount: GuestCount;
  conveniences: Convenience[];
  commentCount: number;
};
