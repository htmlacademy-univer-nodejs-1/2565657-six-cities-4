import { Request } from 'express';

import { RequestBody, RequestParams } from '../../../rest/types/index.js';
import { CreateUserDto } from '../dto/index.js';

export type LoginUserRequest = Request<RequestParams, RequestBody, CreateUserDto>;
