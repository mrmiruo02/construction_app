import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import {
  createCommentPost,
  CreateCommentPost,
} from '../models/createCommentPost.model';
import { JwtAuthGuard } from 'src/utils/guards/jwt.guard';
import { ZodValidationPipe } from 'src/pipe/zodValidation.pipe';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(createCommentPost))
  async createComment(@Body() body: CreateCommentPost) {
    return await this.commentService.insertComment(body);
  }
}
