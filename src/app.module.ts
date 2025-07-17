import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './auth/users.module';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './config/db.config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    PassportModule.register({ session: true }),
    UserModule,
  ],
})
export class AppModule {}
