import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import 'dotenv/config';
import { Post } from 'src/entities/post/post.entity';
import { Comments } from 'src/entities/post/comment.entity';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  entities: [Users, Post, Comments],
  synchronize: true,
};

export const typeOrmConfig = config;
