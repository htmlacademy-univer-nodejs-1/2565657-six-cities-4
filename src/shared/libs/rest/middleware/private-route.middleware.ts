import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Middleware } from './index.js';
import { HttpError } from '../errors/index.js';

export class PrivateRouteMiddleware implements Middleware {
  public async execute({ tokenPayload }: Request, _res: Response, next: NextFunction): Promise<void> {
    if (! tokenPayload) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'PrivateRouteMiddleware'
      );
    }

    return next();
  }
}
