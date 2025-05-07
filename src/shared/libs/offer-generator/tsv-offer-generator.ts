import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import {
  generateRandomCoordinate,
  generateRandomValue,
  getRandomBoolean,
  getRandomItem,
  getRandomItems
} from '../../helpers/index.js';
import {MockServerData} from '../../types/index.js';

const MIN_COORDINATE = 60.00;
const MAX_COORDINATE = 80.00;

const MIN_NUMBER = 1;
const MAX_NUMBER = 5;

const MIN_PRICE = 500;
const MAX_PRICE = 2000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const cityName = getRandomItem<string>(this.mockData.cities);
    const cityLatitude = generateRandomCoordinate(MIN_COORDINATE, MAX_COORDINATE);
    const cityLongitude = generateRandomCoordinate(MIN_COORDINATE, MAX_COORDINATE);
    const previewImage = getRandomItem<string>(this.mockData.images);
    const images = getRandomItems(this.mockData.images).join(';');
    const isPremium = getRandomBoolean();
    const isFavorite = getRandomBoolean();
    const type = getRandomItem<string>(this.mockData.types);
    const rating = generateRandomValue(MIN_NUMBER, MAX_NUMBER);
    const rooms = generateRandomValue(MIN_NUMBER, MAX_NUMBER);
    const guests = generateRandomValue(MIN_NUMBER, MAX_NUMBER);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const conveniences = getRandomItems<string>(this.mockData.conveniences).join(';');
    const name = getRandomItem<string>(this.mockData.names);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatarImage = getRandomItem<string>(this.mockData.avatarImages);
    const password = getRandomItem<string>(this.mockData.passwords);
    const userType = getRandomItem<string>(['обычный', 'pro']);
    const commentsCount = generateRandomValue(MIN_NUMBER, MAX_NUMBER);
    const latitude = generateRandomCoordinate(MIN_COORDINATE, MAX_COORDINATE);
    const longitude = generateRandomCoordinate(MIN_COORDINATE, MAX_COORDINATE);

    return [
      title, description, postDate, cityName,
      cityLatitude, cityLongitude, previewImage, images,
      isPremium, isFavorite, type, rating,
      rooms, guests, price, conveniences,
      name, email, avatarImage, password,
      userType, commentsCount, latitude, longitude
    ].join('\t');
  }
}
