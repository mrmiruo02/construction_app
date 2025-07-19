import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { Users } from '../user.entity';
import { Post } from './post.entity';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @Column()
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Users, (users) => users.posts)
  @JoinColumn({ name: 'usersId' })
  user: Users;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: 'postPostId' })
  post: Post;
}
