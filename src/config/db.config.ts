import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import 'dotenv/config';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  entities: [Users],
  synchronize: true,
};

export const typeOrmConfig = config;
