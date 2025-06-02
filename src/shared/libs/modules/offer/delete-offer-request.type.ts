import { Request } from 'express';

import { DeleteOfferDto } from './dto/delete-offer.dto.js';
import { RequestBody, RequestParams } from '../../rest/index.js';

export type DeleteOfferRequest = Request<RequestParams, RequestBody, DeleteOfferDto>;
