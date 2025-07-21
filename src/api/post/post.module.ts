import { Module } from '@nestjs/common';
import { PostController } from './controllers/post.controller';
import { PostService } from './services/post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entities/post/post.entity';
import { Users } from 'src/entities/user.entity';
import { CommentService } from './services/comment.service';
import { CommentController } from './controllers/comment.controller';
import { Comments } from 'src/entities/post/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Users, Comments])],
  providers: [PostService, CommentService],
  controllers: [PostController, CommentController],
})
export class PostModule {}
