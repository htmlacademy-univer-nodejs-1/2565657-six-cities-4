import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';

import { CommentService, DefaultCommentService, CommentEntity, CommentModel } from './index.js';
import { ComponentName } from '../../../enums/index.js';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer.bind<CommentService>(ComponentName.CommentService)
    .to(DefaultCommentService)
    .inSingletonScope();

  commentContainer.bind<types.ModelType<CommentEntity>>(ComponentName.CommentModel)
    .toConstantValue(CommentModel);

  return commentContainer;
}
