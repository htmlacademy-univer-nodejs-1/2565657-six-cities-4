import dayjs from 'dayjs';

import { DataGenerator } from './index.js';
import { MockServerData } from '../../../cli/mocks/index.js';
import {
  generateRandomCoordinate,
  generateRandomValue,
  getRandomBoolean,
  getRandomItem,
  getRandomItems,
} from '../../helpers/index.js';

const MIN_COORDINATE = 60.0;
const MAX_COORDINATE = 80.0;

const MIN_NUMBER = 1;
const MAX_NUMBER = 10;

const MIN_PRICE = 500;
const MAX_PRICE = 2000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TsvDataGenerator implements DataGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const publicationDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const cityName = getRandomItem<string>(this.mockData.cities);
    const cityLatitude = generateRandomCoordinate(
      MIN_COORDINATE,
      MAX_COORDINATE,
    );
    const cityLongitude = generateRandomCoordinate(
      MIN_COORDINATE,
      MAX_COORDINATE,
    );
    const previewImage = getRandomItem<string>(this.mockData.images);
    const images = getRandomItems(this.mockData.images).join(';');
    const isPremium = getRandomBoolean();
    const isFavorite = getRandomBoolean();
    const placeType = getRandomItem<string>(this.mockData.placeTypes);
    const rating = getRandomItem<number>(this.mockData.ratings);
    const rooms = getRandomItem<number>(this.mockData.rooms);
    const guests = getRandomItem<number>(this.mockData.guests);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const conveniences = getRandomItems<string>(
      this.mockData.conveniences,
    ).join(';');
    const name = getRandomItem<string>(this.mockData.names);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatarImage = getRandomItem<string>(this.mockData.avatarImages);
    const password = getRandomItem<string>(this.mockData.passwords);
    const userType = getRandomItem<string>(this.mockData.userTypes);
    const commentsCount = generateRandomValue(MIN_NUMBER, MAX_NUMBER);
    const latitude = generateRandomCoordinate(MIN_COORDINATE, MAX_COORDINATE);
    const longitude = generateRandomCoordinate(MIN_COORDINATE, MAX_COORDINATE);

    return [
      title,
      description,
      publicationDate,
      cityName,
      cityLatitude,
      cityLongitude,
      previewImage,
      images,
      isPremium,
      isFavorite,
      placeType,
      rating,
      rooms,
      guests,
      price,
      conveniences,
      name,
      email,
      avatarImage,
      password,
      userType,
      commentsCount,
      latitude,
      longitude,
    ].join('\t');
  }
}
