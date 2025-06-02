import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';

import {
  OfferEntity,
  OfferModel,
  OfferService,
  DefaultOfferService
} from './index.js';
import { OfferController } from './offer.controller.js';
import { Component } from '../../../types/index.js';
import { Controller } from '../../rest/index.js';


export function createOfferContainer() {
  const offerContainer = new Container();
  offerContainer.bind<OfferService>(Component.OfferService).to(DefaultOfferService).inSingletonScope();
  offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  offerContainer.bind<OfferService>(Component.DefaultOfferService).to(DefaultOfferService).inSingletonScope();
  offerContainer.bind<Controller>(Component.OfferController).to(OfferController).inSingletonScope();

  return offerContainer;
}
