import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';

import { CommentController , CommentService, DefaultCommentService, CommentEntity, CommentModel } from './index.js';
import { Component } from '../../../types/index.js';
import { Controller } from '../../rest/controller/index.js';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer.bind<CommentService>(Component.CommentService)
    .to(DefaultCommentService)
    .inSingletonScope();

  commentContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel)
    .toConstantValue(CommentModel);
  commentContainer.bind<Controller>(Component.CommentController)
    .to(CommentController).inSingletonScope();

  return commentContainer;
}
