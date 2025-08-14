import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Post } from './post/post.entity';
import { Comments } from './post/comment.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: null })
  password: string;

  @Column({ default: 'CLIENT' })
  role: 'CLIENT' | 'ADMIN' | 'CONTRUCTOR' | 'SUPPLIER';

  @Column({ default: 'CUSTOM' })
  provider: 'CUSTOM' | 'GOOGLE' | 'FACEBOOK';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comments, (comment) => comment.user)
  comments: Comments[];
}
