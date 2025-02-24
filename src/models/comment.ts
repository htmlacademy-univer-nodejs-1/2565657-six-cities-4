import {Rating} from '../enums/rating.js';
import {User} from './user.js';

export type Comment = {
  text: string,
  publicationDate: string,
  rating: Rating
  author: User
}
