import { Location } from './location.js';
import { CityName } from '../enums/index.js';

export type City = {
  name: CityName;
  location: Location;
};
