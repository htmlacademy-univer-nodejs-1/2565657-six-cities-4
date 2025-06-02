import { prop, modelOptions } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: { _id: false }
})
export class LocationSchema {
  @prop({ required: true })
  public latitude!: number;

  @prop({ required: true })
  public longitude!: number;
}
