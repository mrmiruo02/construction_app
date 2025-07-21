import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from 'src/entities/post/comment.entity';
import { Post } from 'src/entities/post/post.entity';
import { Users } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentPost } from '../models/createCommentPost.model';
import { EditCommentPost } from '../models/editCommentPost.model';
import { DeleteCommentPost } from '../models/deleteCommentPost.model';

export class CommentService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Comments)
    private readonly commentRepository: Repository<Comments>,
  ) {}

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
      .where('post.post_id = :post_id', { post_id: param.postID })
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

  async editComment(param: EditCommentPost) {
    const comment = await this.commentRepository.findOneBy({
      comment_id: param.comment_id,
    });

    if (!comment) {
      throw new NotFoundException(`comment not found`);
    }

    Object.assign(comment, param);
    return this.commentRepository.save(comment);
  }

  async deleteComment(param: DeleteCommentPost) {
    const comment = await this.commentRepository.delete({
      comment_id: param.comment_id,
    });

    if (comment.affected === 0) {
      throw new NotFoundException(`comment not found`);
    }

    return { message: 'Comment deleted successfully' };
  }
}
