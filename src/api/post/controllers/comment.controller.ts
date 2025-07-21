import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import {
  createCommentPost,
  CreateCommentPost,
} from '../models/createCommentPost.model';
import { JwtAuthGuard } from 'src/utils/guards/jwt.guard';
import { ZodValidationPipe } from 'src/pipe/zodValidation.pipe';
import {
  EditCommentPost,
  editCommentPost,
} from '../models/editCommentPost.model';
import {
  DeleteCommentPost,
  deleteCommentPost,
} from '../models/deleteCommentPost.model';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(createCommentPost))
  async createComment(@Body() body: CreateCommentPost) {
    return await this.commentService.insertComment(body);
  }

  @Patch('edit')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(editCommentPost))
  async editComment(@Body() body: EditCommentPost) {
    return await this.commentService.editComment(body);
  }

  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(deleteCommentPost))
  async deleteComment(@Body() body: DeleteCommentPost) {
    return await this.commentService.deleteComment(body);
  }
}
