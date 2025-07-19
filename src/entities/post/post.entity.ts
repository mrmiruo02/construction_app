import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Users } from '../user.entity';
import { Comments } from './comment.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  post_id: number;

  @Column()
  header: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  image_url: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Users, (users) => users.posts)
  @JoinColumn({ name: 'usersId' })
  user: Users;

  @OneToMany(() => Comments, (comments) => comments.post)
  comments: Comments[];
}
