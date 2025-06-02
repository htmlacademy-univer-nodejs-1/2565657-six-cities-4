import { Response, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { Logger } from 'pino';

import { CreateOfferRequest } from './create-offer-request.type.js';
import { DeleteOfferRequest } from './delete-offer-request.type.js';
import { OfferService } from './offer-service.interface.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { fillDto } from '../../../helpers/index.js';
import { Component } from '../../../types/index.js';
import { BaseController, HttpError, HttpMethod } from '../../rest/index.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.PinoLogger) protected readonly logger: Logger,
    @inject(Component.DefaultOfferService) private readonly offerService: OfferService
  ) {
    super(logger);

    this.logger.info('Регистрирация маршрутов для контроллера предложений');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/create', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/delete', method: HttpMethod.Delete, handler: this.delete });
  }

  public async index(_req: Request, res: Response) {
    const offers = await this.offerService.find();
    const responseData = fillDto(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create(
    req: CreateOfferRequest,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    // const existedOffer = await this.offerService.findById(req.body.id);
    //
    // if (existedOffer) {
    //   throw new HttpError(
    //     StatusCodes.CONFLICT,
    //     `Такое предложение уже существует: ${req.body.email}`,
    //     'OfferController'
    //   );
    // }

    const result = await this.offerService.create(req.body);
    this.created(res, fillDto(OfferRdo, result));
  }

  public async delete(
    req: DeleteOfferRequest,
    res: Response
  ): Promise<void> {
    const existedOffer = await this.offerService.findById(req.body.id);

    if (!existedOffer) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `Предложение с таким id не найдено: ${req.body.id}`,
        'OfferController'
      );
    }

    await this.offerService.deleteById(req.body.id);
    this.ok(res, {});
  }
}
