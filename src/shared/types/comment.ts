import { Ref } from '@typegoose/typegoose';

import { Rating } from '../enums/index.js';
import { OfferEntity } from '../libs/modules/offer/index.js';

export type Comment = {
  offerId: Ref<OfferEntity>;
  text: string;
  publicationDate: Date;
  rating: Rating;
};
