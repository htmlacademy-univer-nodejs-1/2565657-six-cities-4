import { Request } from 'express';

import { CreateUserDto } from './index.js';
import { RequestBody, RequestParams } from '../../rest/index.js';

export type CreateUserRequest = Request<RequestParams, RequestBody, CreateUserDto>;
