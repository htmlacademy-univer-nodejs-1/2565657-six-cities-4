import {City} from '../types/index.js';
import {CityName} from '../enums/city-name.js';

export const generateCity = (cityName: string, cityLatitude: string, cityLongitude: string): City => {
  return {
    name: getCityName(cityName),
    location: {
      latitude: Number(cityLatitude),
      longitude: Number(cityLongitude),
    }
  };
};

function getCityName(name: string): CityName {
  const cityNameKey = (Object.keys(CityName) as (keyof typeof CityName)[]).find(
    (key) => key === name
  );

  if (cityNameKey) {
    return CityName[cityNameKey];
  } else {
    return CityName.Amsterdam;
  }
}
