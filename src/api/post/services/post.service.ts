import { Post } from 'src/entities/post.entity';
import { Users } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostModel } from '../models/createPost.model';
import { NotFoundException } from '@nestjs/common';
import { ViewPostModel } from '../models/viewPost.model';
import { EditPostModel } from '../models/editPost.model';
import { DeletePost } from '../models/deletePost.model';
import { InjectRepository } from '@nestjs/typeorm';

export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async createPost(param: CreatePostModel) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: param.userID })
      .getOne();

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const post = this.postRepository.create({
      header: param.header,
      content: param.content,
      image_url: param.image_url,
      user: user,
    });

    return await this.postRepository.save(post);
  }

  async viewOnePost(param: ViewPostModel) {
    const result = await this.postRepository
      .createQueryBuilder('post')
      .where('post.post_id = :id', { id: param.id })
      .getOne();

    if (!result) {
      throw new NotFoundException('Post not found');
    }

    return result;
  }

  async viewAllPost(param: ViewPostModel) {
    const result = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .where('user.id = :user', { user: param.userID })
      .getMany();

    if (result.length <= 0) {
      throw new NotFoundException('Post not found');
    }
    return result;
  }

  async editPost(param: EditPostModel) {
    const result = await this.postRepository.findOneBy({ post_id: param.id });

    if (!result) {
      throw new NotFoundException(`User not found`);
    }

    Object.assign(result, param);
    return this.postRepository.save(result);
  }

  async deletePost(param: DeletePost) {
    const result = await this.postRepository.findOneBy({ post_id: param.id });

    if (!result) {
      throw new NotFoundException('Post not found');
    }

    return await this.postRepository.delete(result.post_id);
  }
}
