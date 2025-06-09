import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Types } from 'mongoose';

import { CreateOfferDto, UpdateOfferDto } from './dto/index.js';
import { OfferService, OfferEntity } from './index.js';
import { Component } from '../../../types/index.js';
import { Logger } from '../../logger/index.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.PinoLogger) private readonly logger: Logger,
    @inject(Component.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create({
      ...dto,
      isFavorite: false,
      rating: 1,
      commentCount: 0
    });
    this.logger.info(`Сгенерирован оффер, название: ${dto.title}`);

    return result;
  }

  public async findById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(id)
      .populate('offerAuthor')
      .exec();
  }

  public async updateById(id: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(id, dto, { new: true })
      .populate('offerAuthor')
      .exec();
  }

  public async deleteById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(id)
      .exec();
  }

  public async find(limit = 60): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .sort({ postDate: -1 })
      .limit(limit)
      .populate('offerAuthor')
      .exec();
  }

  public async findPremiumByCityName(city: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ 'city.name': city, isPremium: true }) // <-- Здесь изменение!
      .sort({ postDate: -1 })
      .limit(3)
      .populate('offerAuthor')
      .exec();
  }

  public async findFavorites(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ isFavorite: true })
      .sort({ postDate: -1 })
      .populate('offerAuthor')
      .exec();
  }

  public async addToFavorites(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(
        offerId,
        { isFavorite: true },
        { new: true }
      )
      .populate('offerAuthor')
      .exec();
  }

  public async removeFromFavorites(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(
        offerId,
        { isFavorite: false },
        { new: true }
      )
      .populate('offerAuthor')
      .exec();
  }

  public async exists(id: string): Promise<boolean> {
    return (await this.offerModel
      .exists({ _id: new Types.ObjectId(id) })) !== null;
  }

  public async incCommentCount(id: string): Promise<DocumentType<OfferEntity> | null> {
    const updatedOffer = await this.offerModel
      .findByIdAndUpdate(
        id,
        { $inc: { commentCount: 1 } },
        { new: true }
      )
      .exec();

    if (updatedOffer) {
      return this.updateRating(id);
    }

    return null;
  }

  private async updateRating(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const aggregateResult = await this.offerModel
      .aggregate([
        { $match: { _id: new Types.ObjectId(offerId) } },
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'offerId',
            as: 'comments'
          }
        },
        {
          $addFields: {
            rating: { $ifNull: [{ $avg: '$comments.rating' }, 0] },
          }
        },
        { $project: { comments: 0 } }
      ])
      .exec();

    if (!aggregateResult.length) {
      return null;
    }

    const newRating = aggregateResult[0].rating;
    return this.offerModel
      .findByIdAndUpdate(offerId, { rating: newRating }, { new: true })
      .populate('offerAuthor')
      .exec();
  }
}
