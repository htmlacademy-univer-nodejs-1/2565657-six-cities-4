import { Ref } from '@typegoose/typegoose';

import { Offer } from './index.js';
import { Convenience, GuestCount, RoomCount } from '../enums/index.js';
import { UserEntity } from '../libs/modules/user/index.js';

export type DetailedOffer = Offer & {
  description: string;
  publicationDate: Date;
  images: string[];
  roomCount: RoomCount;
  guestCount: GuestCount;
  offerAuthor: Ref<UserEntity>;
  conveniences: Convenience[];
  commentCount: number;
};
