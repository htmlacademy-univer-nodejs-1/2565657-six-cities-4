import { DocumentType } from '@typegoose/typegoose';

import { CreateOfferDto, OfferEntity, UpdatedOfferDto } from './index.js';


export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(offerId: string, dto: UpdatedOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  find(limit?: number): Promise<DocumentType<OfferEntity>[]>;
  findPremiumByCity(city: string): Promise<DocumentType<OfferEntity>[]>;
  findFavorites(): Promise<DocumentType<OfferEntity>[]>;
  addToFavorites(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  removeFromFavorites(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  exists(offerId: string): Promise<boolean>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateRating(offerId: string): Promise<DocumentType<OfferEntity> | null>;
}
