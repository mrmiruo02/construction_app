import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from 'src/entities/post/comment.entity';
import { Post } from 'src/entities/post/post.entity';
import { Users } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentPost } from '../models/createCommentPost.model';

export class CommentService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Comments)
    private readonly commentRepository: Repository<Comments>,
  ) {}

  // insert comment - done
  // update comment - on progress
  // delete comment - to be follow

  async insertComment(param: CreateCommentPost) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: param.userID })
      .getOne();

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const post = await this.postRepository
      .createQueryBuilder('post')
      .where('post.post_id = :id', { id: param.postID })
      .getOne();

    if (!post) {
      throw new NotFoundException('post not found');
    }

    const createCommentPost = this.commentRepository.create({
      content: param.content,
      user: user,
      post: post,
    });

    return await this.commentRepository.save(createCommentPost);
  }
}
