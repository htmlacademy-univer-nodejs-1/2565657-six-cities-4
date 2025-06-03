import { Response, Request } from 'express';
import { inject, injectable } from 'inversify';
import { Logger } from 'pino';

import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { OfferService } from './offer-service.interface.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { CreateOfferRequest } from './type/create-offer-request.type.js';
import { ParamOfferId } from './type/param-offerid.type.js';
import { fillDto } from '../../../helpers/index.js';
import { Component } from '../../../types/index.js';
import { BaseController, HttpMethod } from '../../rest/index.js';
import { DocumentExistsMiddleware } from '../../rest/middleware/document-exists.middleware.js';
import { PrivateRouteMiddleware } from '../../rest/middleware/private-route.middleware.js';
import { ValidateDtoMiddleware } from '../../rest/middleware/validate-dto.middleware.js';
import { ValidateObjectIdMiddleware } from '../../rest/middleware/validate-objectid.middleware.js';
import { CommentService } from '../comment/index.js';
import { CommentRdo } from '../comment/rdo/comment.rdo.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.PinoLogger) protected readonly logger: Logger,
    @inject(Component.DefaultOfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info('Регистрирация маршрутов для контроллера предложений');

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    // this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    // this.addRoute({ path: '/:offerId', method: HttpMethod.Get, handler: this.show });
    // this.addRoute({ path: '/create', method: HttpMethod.Post, handler: this.create });
    // this.addRoute({ path: '/delete', method: HttpMethod.Delete, handler: this.delete });
  }

  public async show({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId);
    this.ok(res, fillDto(OfferRdo, offer));
  }

  public async index(_req: Request, res: Response) {
    const offers = await this.offerService.find();
    this.ok(res, fillDto(OfferRdo, offers));
  }

  public async create({ body }: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create(body);
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDto(OfferRdo, offer));
  }

  public async delete({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId);

    await this.commentService.deleteByOfferId(offerId);
    this.noContent(res, offer);
  }

  public async update({ body, params }: Request<ParamOfferId, unknown, UpdateOfferDto>, res: Response): Promise<void> {
    const updatedOffer = await this.offerService.updateById(params.offerId, body);
    this.ok(res, fillDto(OfferRdo, updatedOffer));
  }

  public async getComments({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDto(CommentRdo, comments));
  }

  // public async getNew(_req: Request, res: Response) {
  //   const newOffers = await this.offerService.findNew(DEFAULT_NEW_OFFER_COUNT);
  //   this.ok(res, fillDto(OfferRdo, newOffers));
  // }
  //
  // public async getDiscussed(_req: Request, res: Response) {
  //   const discussedOffers = await this.offerService.findDiscussed(DEFAULT_DISCUSSED_OFFER_COUNT);
  //   this.ok(res, fillDto(OfferRdo, discussedOffers));
  // }
}
