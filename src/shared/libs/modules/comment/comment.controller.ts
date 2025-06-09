import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Logger } from 'pino';

import { OfferService } from '../offer/index.js';
import { CreateCommentDto } from './dto/index.js';
import { CommentService , CommentRdo } from './index.js';
import { fillDto } from '../../../helpers/index.js';
import { Component } from '../../../types/index.js';
import { BaseController } from '../../rest/controller/index.js';
import { DocumentExistsMiddleware , PrivateRouteMiddleware , ValidateDtoMiddleware , ValidateObjectIdMiddleware } from '../../rest/middleware/index.js';
import { HttpMethod } from '../../rest/types/index.js';
import { ParamOfferId } from '../offer/type/index.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.PinoLogger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCommentDto),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
  }

  public async getComments({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);

    this.ok(res, fillDto(CommentRdo, comments));
  }

  public async create(
    { body, params }: Request<ParamOfferId, unknown, CreateCommentDto>,
    res: Response
  ): Promise<void> {
    const comment = await this.commentService.create({ ...body, offerId: params.offerId});
    await this.offerService.incCommentCount(params.offerId);

    this.created(res, fillDto(CommentRdo, comment));
  }
}
