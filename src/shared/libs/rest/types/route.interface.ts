import { NextFunction, Request, Response } from 'express';

import { HttpMethod } from '../index.js';
import { Middleware } from '../middleware/middleware.interface.js';

export interface Route {
  path: string;
  method: HttpMethod;
  handler: (req: Request, res: Response, next: NextFunction) => void;
  middlewares?: Middleware[];
}
