import {Offer} from '../models/offer.js';
import {cities} from './cities.js';
import {Rating} from '../enums/rating.js';
import {HousingType} from '../enums/housing-type.js';
import {RoomCount} from '../enums/room-count.js';
import {GuestCount} from '../enums/guest-count.js';
import {Convenience} from '../enums/convenience.js';
import {UserType} from '../enums/user-type.js';

export const offers: Offer[] = [{
  title: 'Cozy Apartment in the City Center',
  description: 'This apartment is perfect for a romantic weekend or a business trip.',
  publicationDate: '2023-10-01',
  city: cities[1],
  preview: 'https://example.com/preview1.jpg',
  images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
  isPremium: true,
  isFavorite: false,
  rating: Rating.FourStar,
  housing: HousingType.Apartment,
  roomCount: RoomCount.Four,
  guestCount: GuestCount.Six,
  price: 5000,
  conveniences: [Convenience.Breakfast, Convenience.Workspace, Convenience.AirConditioning, Convenience.Towels],
  offerAuthor: {
    name: 'Ivan Ivanov',
    email: 'ivan@example.com',
    avatarImage: 'https://example.com/avatar1.jpg',
    password: 'securepassword123',
    userType: UserType.Common
  },
  commentCount: 10,
  location: { latitude: 55.7558, longitude: 37.6173 }
},
{
  title: 'Family House with Garden',
  description: 'Spacious house with a large yard, ideal for family vacations.',
  publicationDate: '2023-10-02',
  city: cities[2],
  preview: 'https://example.com/preview2.jpg',
  images: ['https://example.com/image3.jpg', 'https://example.com/image4.jpg'],
  isPremium: false,
  isFavorite: true,
  rating: Rating.ThreeStar,
  housing: HousingType.House,
  roomCount: RoomCount.Five,
  guestCount: GuestCount.Four,
  price: 12000,
  conveniences: [Convenience.BabySeat, Convenience.LaptopFriendly, Convenience.Washer],
  offerAuthor: {
    name: 'Maria Petrova',
    email: 'maria@example.com',
    avatarImage: 'https://example.com/avatar2.jpg',
    password: 'anothersecurepassword456',
    userType: UserType.Pro
  },
  commentCount: 5,
  location: { latitude: 59.9343, longitude: 30.3351 }
}];


