import { Request } from 'express';

import { RequestBody, RequestParams } from '../../../rest/index.js';
import { DeleteOfferDto } from '../dto/delete-offer.dto.js';

export type DeleteOfferRequest = Request<RequestParams, RequestBody, DeleteOfferDto>;
