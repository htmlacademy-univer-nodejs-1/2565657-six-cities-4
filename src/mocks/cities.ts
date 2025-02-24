import {City} from '../models/city.js';
import {CityName} from '../enums/city-name.js';
import {Location} from '../models/location.js';

const cityLocations: Location[] = [
  {
    latitude: 48.85661,
    longitude: 2.351499
  },
  {
    latitude: 50.938361,
    longitude: 6.959974
  },
  {
    latitude: 50.846557,
    longitude: 4.351697
  },
  {
    latitude: 52.370216,
    longitude: 4.895168
  },
  {
    latitude: 53.550341,
    longitude: 10.000654
  },
  {
    latitude: 51.225402,
    longitude: 6.776314
  }
];

export const cities: City[] = [
  {
    name: CityName.Paris,
    location: cityLocations[0]
  },
  {
    name: CityName.Cologne,
    location: cityLocations[1]
  },
  {
    name: CityName.Brussels,
    location: cityLocations[2]
  },
  {
    name: CityName.Amsterdam,
    location: cityLocations[3]
  },
  {
    name: CityName.Hamburg,
    location: cityLocations[4]
  },
  {
    name: CityName.Dusseldorf,
    location: cityLocations[5]
  }
];

