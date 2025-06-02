import { Request } from 'express';

import { CreateUserDto } from './dto/create-user.dto.js';
import { RequestBody, RequestParams } from '../../rest/index.js';

export type LoginUserRequest = Request<RequestParams, RequestBody, CreateUserDto>;
