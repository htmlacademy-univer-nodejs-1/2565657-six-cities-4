import { Request } from 'express';

import { RequestBody, RequestParams } from '../../../rest/types/index.js';
import { CreateOfferDto } from '../dto/index.js';

export type CreateOfferRequest = Request<RequestParams, RequestBody, CreateOfferDto>;
