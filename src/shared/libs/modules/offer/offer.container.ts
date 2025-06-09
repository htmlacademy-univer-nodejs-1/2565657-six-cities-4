import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';

import {
  OfferEntity,
  OfferModel,
  OfferService,
  DefaultOfferService
  , OfferController } from './index.js';
import { Component } from '../../../types/index.js';
import { Controller } from '../../rest/controller/index.js';


export function createOfferContainer() {
  const offerContainer = new Container();
  offerContainer.bind<OfferService>(Component.OfferService).to(DefaultOfferService).inSingletonScope();
  offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  offerContainer.bind<OfferService>(Component.DefaultOfferService).to(DefaultOfferService).inSingletonScope();
  offerContainer.bind<Controller>(Component.OfferController).to(OfferController).inSingletonScope();

  return offerContainer;
}
