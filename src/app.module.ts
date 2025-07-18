import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './config/db.config';
import { PassportModule } from '@nestjs/passport';
import { PostModule } from './api/post/post.module';
import { UserModule } from './api/auth/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    PassportModule.register({ session: true }),
    UserModule,
    PostModule,
  ],
})
export class AppModule {}
