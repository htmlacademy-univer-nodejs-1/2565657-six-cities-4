import { User } from './user.js';
import { Rating } from '../enums/index.js';

export type Comment = {
  text: string;
  publicationDate: string;
  rating: Rating;
  author: User;
};
