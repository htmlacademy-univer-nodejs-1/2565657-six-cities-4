import { Request } from 'express';

import { RequestBody, RequestParams } from '../../../rest/index.js';
import { CreateUserDto } from '../index.js';

export type CreateUserRequest = Request<RequestParams, RequestBody, CreateUserDto>;
