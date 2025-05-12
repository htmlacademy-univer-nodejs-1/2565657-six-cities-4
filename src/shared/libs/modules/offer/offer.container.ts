import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';

import {
  OfferEntity,
  OfferModel,
  OfferService,
  DefaultOfferService
} from './index.js';
import { ComponentName } from '../../../enums/index.js';


export function createOfferContainer() {
  const offerContainer = new Container();
  offerContainer.bind<OfferService>(ComponentName.OfferService).to(DefaultOfferService).inSingletonScope();
  offerContainer.bind<types.ModelType<OfferEntity>>(ComponentName.OfferModel).toConstantValue(OfferModel);

  return offerContainer;
}
