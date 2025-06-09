import { Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';

import { generateCity } from './index.js';
import { PlaceType , Convenience , Rating , RoomCount , GuestCount } from '../enums/index.js';
import { UserEntity } from '../libs/modules/user/index.js';
import { DetailedOffer , Location } from '../types/index.js';


export function generateDetailedOffer(
  title: string,
  description: string,
  postDate: string,
  cityName: string,
  cityLatitude: string,
  cityLongitude: string,
  preview: string,
  images: string,
  isPremium: string,
  isFavorite: string,
  placeType: string,
  rating: string,
  roomCount: string,
  guests: string,
  price: string,
  conveniences: string,
  offerAuthorId: string,
  commentsCount: string,
  latitude: string,
  longitude: string,
): DetailedOffer {
  const city = generateCity(cityName, cityLatitude, cityLongitude);

  const offerAuthor: Ref<UserEntity> = new Types.ObjectId(offerAuthorId) as Ref<UserEntity>;

  const location: Location = {
    latitude: Number(latitude),
    longitude: Number(longitude),
  };

  return {
    title,
    description,
    publicationDate: new Date(postDate),
    city,
    preview,
    images: images.split(';'),
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    placeType: placeType as PlaceType,
    rating: Number(rating) as Rating,
    roomCount: Number(roomCount) as RoomCount,
    guestCount: Number(guests) as GuestCount,
    price: Number(price),
    conveniences: conveniences.split(';') as Convenience[],
    offerAuthor,
    commentCount: Number(commentsCount),
    location,
  };
}

// function getRating(name: string): Rating {
//   const cityNameKey = (Object.keys(Rating) as (keyof typeof Rating)[]).find(
//     (key) => key === name,
//   );
//
//   if (cityNameKey) {
//     return Rating[cityNameKey];
//   } else {
//     return Rating.OneStar;
//   }
// }
//
// function getRoomCount(name: string): RoomCount {
//   const cityNameKey = (
//     Object.keys(RoomCount) as (keyof typeof RoomCount)[]
//   ).find((key) => key === name);
//
//   if (cityNameKey) {
//     return RoomCount[cityNameKey];
//   } else {
//     return RoomCount.One;
//   }
// }
//
// function getGuestCount(name: string): GuestCount {
//   const cityNameKey = (
//     Object.keys(GuestCount) as (keyof typeof GuestCount)[]
//   ).find((key) => key === name);
//
//   if (cityNameKey) {
//     return GuestCount[cityNameKey];
//   } else {
//     return GuestCount.One;
//   }
// }
