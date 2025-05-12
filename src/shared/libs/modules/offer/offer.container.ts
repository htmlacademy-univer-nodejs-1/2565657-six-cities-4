import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';

import {DefaultOfferService} from './default-offer.service.js';
import {OfferService} from './offer-service.interface.js';
import {OfferEntity, OfferModel} from './offer.entity.js';
import { ComponentName } from '../../../enums/index.js';


export function createOfferContainer() {
  const offerContainer = new Container();
  offerContainer.bind<OfferService>(ComponentName.OfferService).to(DefaultOfferService).inSingletonScope();
  offerContainer.bind<types.ModelType<OfferEntity>>(ComponentName.OfferModel).toConstantValue(OfferModel);

  return offerContainer;
}
