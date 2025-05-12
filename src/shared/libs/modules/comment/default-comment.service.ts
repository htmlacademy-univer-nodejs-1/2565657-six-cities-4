import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { CommentService, CreateCommentDto, CommentEntity } from './index.js';
import { ComponentName } from '../../../enums/index.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(ComponentName.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    return comment.populate('authorId');
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({offerId})
      .populate('authorId');
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({offerId})
      .exec();

    return result.deletedCount;
  }
}
