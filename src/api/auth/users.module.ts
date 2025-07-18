import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/users.controller';
import { UserService } from './services/users.service';
import { Users } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from 'src/utils/strategies/google.strategy';
import { SessionSerializer } from 'src/utils/serializer/serializer';
import { GoogleController } from './controllers/google.controller';
import { GoogleService } from './services/google.service';
import { LocalStrategy } from 'src/utils/strategies/local.strategy';
import { JwtStrategy } from 'src/utils/strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: 'secretkey',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    UserService,
    GoogleService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    SessionSerializer,
    { provide: 'AUTH_SERVICE', useClass: GoogleService },
  ],
  controllers: [UserController, GoogleController],
})
export class UserModule {}
