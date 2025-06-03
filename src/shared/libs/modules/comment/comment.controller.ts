import { Response} from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { Logger } from 'pino';

import { CommentService } from './comment-service.interface.js';
import { OfferService } from '../offer/index.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { CommentRdo } from './rdo/comment.rdo.js';
import { CreateCommentRequest } from './type/create-comment-request.type.js';
import { fillDto } from '../../../helpers/index.js';
import { Component } from '../../../types/index.js';
import { BaseController, HttpError, HttpMethod } from '../../rest/index.js';
import { PrivateRouteMiddleware } from '../../rest/middleware/private-route.middleware.js';
import { ValidateDtoMiddleware } from '../../rest/middleware/validate-dto.middleware.js';

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
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCommentDto)
      ]
    });
  }

  public async create(
    { body, tokenPayload }: CreateCommentRequest,
    res: Response
  ): Promise<void> {

    if (! await this.offerService.exists(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create({ ...body, authorId: tokenPayload.id });
    await this.offerService.incCommentCount(body.offerId);
    this.created(res, fillDto(CommentRdo, comment));
  }
}
