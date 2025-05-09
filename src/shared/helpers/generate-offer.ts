import { generateCity , generateUser } from './index.js';
import { PlaceType , Convenience , Rating , RoomCount , GuestCount } from '../enums/index.js';
import { Location , Offer } from '../types/index.js';

export function generateOffer(offerData: string): Offer {
  const [
    title,
    description,
    postDate,
    cityName,
    cityLatitude,
    cityLongitude,
    preview,
    images,
    isPremium,
    isFavorite,
    type,
    rating,
    roomCount,
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
  ] = offerData.replace('\n', '').split('\t');

  const city = generateCity(cityName, cityLatitude, cityLongitude);

  const offerAuthor = generateUser(
    name,
    email,
    avatarImage,
    password,
    userType,
  );

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
    placeType: type as PlaceType,
    rating: getRating(rating),
    roomCount: getRoomCount(roomCount),
    guestCount: getGuestCount(guests),
    price: Number(price),
    conveniences: conveniences.split(';') as Convenience[],
    offerAuthor,
    commentCount: Number(commentsCount),
    location,
  };
}

function getRating(name: string): Rating {
  const cityNameKey = (Object.keys(Rating) as (keyof typeof Rating)[]).find(
    (key) => key === name,
  );

  if (cityNameKey) {
    return Rating[cityNameKey];
  } else {
    return Rating.OneStar;
  }
}

function getRoomCount(name: string): RoomCount {
  const cityNameKey = (
    Object.keys(RoomCount) as (keyof typeof RoomCount)[]
  ).find((key) => key === name);

  if (cityNameKey) {
    return RoomCount[cityNameKey];
  } else {
    return RoomCount.One;
  }
}

function getGuestCount(name: string): GuestCount {
  const cityNameKey = (
    Object.keys(GuestCount) as (keyof typeof GuestCount)[]
  ).find((key) => key === name);

  if (cityNameKey) {
    return GuestCount[cityNameKey];
  } else {
    return GuestCount.One;
  }
}
