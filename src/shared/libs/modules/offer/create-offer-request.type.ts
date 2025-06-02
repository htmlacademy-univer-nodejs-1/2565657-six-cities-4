import { Request } from 'express';

import { CreateOfferDto } from './dto/create-offer.dto.js';
import { RequestBody, RequestParams } from '../../rest/index.js';

export type CreateOfferRequest = Request<RequestParams, RequestBody, CreateOfferDto>;
