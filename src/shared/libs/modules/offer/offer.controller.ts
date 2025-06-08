import { Response, Request } from 'express';
import { inject, injectable } from 'inversify';
import { Logger } from 'pino';

import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { OfferService } from './offer-service.interface.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { CreateOfferRequest } from './type/create-offer-request.type.js';
import { ParamOfferId } from './type/param-offerid.type.js';
import { DetailedOfferDto } from '../../../../../dist/shared/libs/modules/offer/index.js';
import { CityName } from '../../../enums/index.js';
import { fillDto } from '../../../helpers/index.js';
import { Component } from '../../../types/index.js';
import { BaseController, HttpMethod } from '../../rest/index.js';
import { DocumentExistsMiddleware } from '../../rest/middleware/document-exists.middleware.js';
import { PrivateRouteMiddleware } from '../../rest/middleware/private-route.middleware.js';
import { ValidateDtoMiddleware } from '../../rest/middleware/validate-dto.middleware.js';
import { ValidateObjectIdMiddleware } from '../../rest/middleware/validate-objectid.middleware.js';
import { CommentService } from '../comment/index.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.PinoLogger) protected readonly logger: Logger,
    @inject(Component.DefaultOfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info('Регистрация маршрутов для контроллера предложений');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index
    });

    this.addRoute({
      path: '/create',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'DetailedOffer', 'offerId'),
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
        new DocumentExistsMiddleware(this.offerService, 'DetailedOffer', 'offerId')
      ]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'DetailedOffer', 'offerId')
      ]
    });

    this.addRoute({
      path: '/premium',
      method: HttpMethod.Get,
      handler: this.getPremium,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'DetailedOffer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/favorite',
      method: HttpMethod.Get,
      handler: this.getFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new DocumentExistsMiddleware(this.offerService, 'DetailedOffer', 'offerId')
      ]
    });

    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Post,
      handler: this.addToFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'DetailedOffer', 'offerId')
      ]
    });

    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Delete,
      handler: this.deleteFromFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'DetailedOffer', 'offerId')
      ]
    });
  }

  public async index(_req: Request, res: Response) {
    const offers = await this.offerService.find();

    this.ok(res, fillDto(OfferRdo, offers));
  }

  public async show({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const detailedOffer = await this.offerService.findById(offerId);

    this.ok(res, fillDto(DetailedOfferDto, detailedOffer));
  }


  public async create({ body }: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create(body);

    this.created(res,{ offerId: result.id as string });
  }

  public async delete({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;

    await this.offerService.deleteById(offerId);
    await this.commentService.deleteByOfferId(offerId);

    this.noContent(res, {});
  }

  public async update({ body, params }: Request<ParamOfferId, unknown, UpdateOfferDto>, res: Response): Promise<void> {
    const updatedDetailedOffer = await this.offerService.updateById(params.offerId, body);

    this.ok(res, fillDto(DetailedOfferDto, updatedDetailedOffer));
  }

  public async getPremium(req: Request, res: Response): Promise<void> {
    const cityName = req.query.city as CityName;
    const premiumOffers = await this.offerService.findPremiumByCityName(cityName);

    this.ok(res, fillDto(OfferRdo, premiumOffers));
  }

  public async getFavorite(_req: Request, res: Response): Promise<void> {
    const favoriteOffers = await this.offerService.findFavorites();

    this.ok(res, fillDto(OfferRdo, favoriteOffers));
  }

  public async addToFavorite({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;

    await this.offerService.addToFavorites(offerId);

    this.ok(res, {});
  }

  public async deleteFromFavorite({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;

    await this.offerService.removeFromFavorites(offerId);

    this.noContent(res, {});
  }
}
