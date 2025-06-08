import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';

import { CitySchema } from './city.schema.js';
import { LocationSchema } from './location.schema.js';
import { Convenience, PlaceType } from '../../../enums/index.js';
import { DetailedOffer } from '../../../types/detailed-offer.js';
import { Location } from '../../../types/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function(_doc, ret) {
        delete ret._id;
        return ret;
      }
    },
    toObject: {
      virtuals: true,
      transform: function(_doc, ret) {
        delete ret._id;
        return ret;
      }
    }
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps implements DetailedOffer {
  @prop({
    required: true,
    minlength: 10,
    maxlength: 100,
    trim: true
  })
  public title!: string;

  @prop({
    required: true,
    minlength: 20,
    maxlength: 1024,
    trim: true
  })
  public description!: string;

  @prop({
    required: true,
    default: Date.now
  })
  public publicationDate!: Date;

  @prop({
    required: true,
    type: CitySchema
  })
  public city!: CitySchema;

  @prop({
    required: true,
    match: [/\.(jpg|png)$/i, 'Аватарка должна быть в формате JPEG или PNG']
  })
  public preview!: string;

  @prop({
    required: true,
    type: () => [String]
  })
  public images!: string[];

  @prop({ required: true, default: false })
  public isPremium!: boolean;

  @prop({ required: true, default: false })
  public isFavorite!: boolean;

  @prop({
    required: true,
    min: 1,
    max: 5,
    default: 1
  })
  public rating!: number;

  @prop({
    required: true,
    type: () => [String],
    enum: Object.values(PlaceType),
  })
  public placeType!: PlaceType;

  @prop({
    required: true,
    min: 1,
    max: 8
  })
  public roomCount!: number;

  @prop({
    required: true,
    min: 1,
    max: 10
  })
  public guestCount!: number;

  @prop({
    required: true,
    min: 100,
    max: 100000
  })
  public price!: number;

  @prop({
    required: true,
    type: () => [String],
    enum: Object.values(Convenience),
  })
  public conveniences!: Convenience[];

  @prop({
    required: true,
    ref: UserEntity
  })
  public offerAuthor!: Ref<UserEntity>;

  @prop({
    required: true,
    default: 0
  })
  public commentCount!: number;

  @prop({
    required: true,
    type: LocationSchema,
    validate: {
      validator: (v: Location) =>
        v.latitude >= -90 &&
        v.latitude <= 90 &&
        v.longitude >= -180 &&
        v.longitude <= 180,
      message: 'Неправильное местоположение'
    }
  })
  public location!: LocationSchema;
}

export const OfferModel = getModelForClass(OfferEntity);
