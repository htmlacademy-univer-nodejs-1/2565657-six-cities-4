import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Logger } from 'pino';

import { BaseUserException } from './errors/index.js';
import { Component } from '../../../types/index.js';
import { ExceptionFilter } from '../../rest/exception-filter/index.js';

@injectable()
export class AuthExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.PinoLogger) private readonly logger: Logger
  ) {
    this.logger.info('Register AuthExceptionFilter');
  }

  public catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (! (error instanceof BaseUserException)) {
      return next(error);
    }

    this.logger.error(`[AuthModule] ${error.message}`, error);
    res.status(error.httpStatusCode)
      .json({
        type: 'AUTHORIZATION',
        error: error.message,
      });
  }
}
