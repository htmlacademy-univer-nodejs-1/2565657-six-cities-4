import {CityName} from '../enums/city-name.js';
import {Location} from './location.js';

export type City = {
  name: CityName,
  location: Location
}
