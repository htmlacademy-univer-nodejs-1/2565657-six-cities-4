import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import 'reflect-metadata';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferService } from './offer-service.interface.js';
import { OfferEntity } from './offer.entity.js';
import { ComponentName } from '../../../enums/index.js';
import { Logger } from '../../logger/index.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(ComponentName.Logger) private readonly logger: Logger,
    @inject(ComponentName.OfferModel)
    private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async generate(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = this.offerModel.create(dto);
    this.logger.info(`Сгенерирован оффер, название: ${dto.title}`);

    return result;
  }

  public async findById(
    id: string
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(id);
  }
}
