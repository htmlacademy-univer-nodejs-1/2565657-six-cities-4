import { IsInt, IsString, Length, Max, Min } from 'class-validator';

import { CreateCommentMessages } from './index.js';
import { Rating } from '../../../../enums/index.js';

export class CreateCommentDto {
  @IsString({ message: CreateCommentMessages.text.invalidFormat })
  @Length(5, 1024, { message: CreateCommentMessages.text.lengthField})
  public text!: string;

  @IsInt({ message: CreateCommentMessages.rating.invalidFormat })
  @Min(1, { message: CreateCommentMessages.rating.minValue })
  @Max(5, { message: CreateCommentMessages.rating.maxValue })
  public rating!: Rating;

  authorId: string;
  offerId?: string;
}
