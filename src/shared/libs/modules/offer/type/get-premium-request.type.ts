import { Request } from 'express';

import { RequestBody, RequestParams } from '../../../rest/types/index.js';

export type GetPremiumRequest = Request<RequestParams, RequestBody, Record<string, never>, { cityName?: string }>;
