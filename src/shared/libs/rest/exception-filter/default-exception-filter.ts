import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { Error } from 'mongoose';
import { Logger } from 'pino';

import { ExceptionFilter } from './exception-filter.interface.js';
import { createErrorObject } from '../../../helpers/index.js';
import { Component } from '../../../types/index.js';
import { HttpError } from '../errors/http-error.js';


@injectable()
export class DefaultExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.PinoLogger) private readonly logger: Logger
  ) {
    this.logger.info('Регистрация DefaultExceptionFilter');
  }

  public catch(error: Error | HttpError, req: Request, res: Response, next: NextFunction) {
    if (error instanceof HttpError) {
      this.handleHttpError(error, req, res, next);
    }

    this.handleOtherError(error, req, res, next);
  }

  private handleHttpError(error: HttpError, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(`[${error.detail}]: ${error.httpStatusCode} - ${error.message}`, error);
    res
      .status(error.httpStatusCode)
      .json(createErrorObject(error.message));
  }

  private handleOtherError(error: Error, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(error.message, error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject(error.message));
  }
}
