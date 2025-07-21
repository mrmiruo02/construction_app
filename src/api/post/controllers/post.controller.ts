import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipe/zodValidation.pipe';
import { JwtAuthGuard } from 'src/utils/guards/jwt.guard';
import { CreatePostModel, createPostModel } from '../models/createPost.model';
import { PostService } from '../services/post.service';
import { viewPostModel, ViewPostModel } from '../models/viewPost.model';
import { editPostModel, EditPostModel } from '../models/editPost.model';
import { deletePost, DeletePost } from '../models/deletePost.model';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(createPostModel))
  async create(@Body() body: CreatePostModel) {
    return await this.postService.createPost(body);
  }

  @Post('view')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(viewPostModel))
  async viewAll(@Body() body: ViewPostModel) {
    return await this.postService.viewAllPost(body);
  }

  @Post('view/one')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(viewPostModel))
  async viewSingle(@Body() body: ViewPostModel) {
    return await this.postService.viewOnePost(body);
  }

  @Patch('update')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(editPostModel))
  async editPost(@Body() body: EditPostModel) {
    return await this.postService.editPost(body);
  }

  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(deletePost))
  async deletePost(@Body() body: DeletePost) {
    return await this.postService.deletePost(body);
  }
}
