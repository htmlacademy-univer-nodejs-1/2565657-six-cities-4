import { modelOptions, prop } from '@typegoose/typegoose';

import { LocationSchema } from './location.schema.js';
import { CityName } from '../../../enums/index.js';

@modelOptions({
  schemaOptions: { _id: false }
})
export class CitySchema {
  @prop({
    required: true,
    enum: Object.values(CityName),
    type: String,
  })
  public name!: CityName;

  @prop({ required: true, type: LocationSchema })
  public location!: LocationSchema;
}
