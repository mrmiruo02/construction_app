import { Module } from '@nestjs/common';
import { PostController } from './controllers/post.controller';
import { PostService } from './services/post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { Users } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Users])],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
