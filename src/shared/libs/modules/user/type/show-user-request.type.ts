import { Request } from 'express';

import { RequestBody, RequestParams } from '../../../rest/index.js';
import { ShowUser } from '../dto/show-user.js';

export type ShowUserRequest = Request<RequestParams, RequestBody, ShowUser>;
