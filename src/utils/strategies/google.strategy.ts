import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Profile } from 'passport';
import { UsersCreate } from 'src/api/auth/models/userCreate.model';
import { GoogleService } from 'src/api/auth/services/google.service';
import 'dotenv/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly googleService: GoogleService,
  ) {
    super({
      clientID: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
      callbackURL: 'http://localhost:3000/auth/google/redirect',
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    enum AuthProvider {
      CUSTOM = 'CUSTOM',
      GOOGLE = 'GOOGLE',
      FACEBOOK = 'FACEBOOK',
    }

    enum UserRole {
      CLIENT = 'CLIENT',
      ADMIN = 'ADMIN',
      CONSTRUCTOR = 'CONTRUCTOR',
      SUPPLIER = 'SUPPLIER',
    }

    const email = profile.emails?.[0].value;

    if (!email) {
      throw new UnauthorizedException(
        'Email not available from OAuth provider',
      );
    }

    const details: UsersCreate = {
      name: profile.displayName,
      email: email,
      provider: AuthProvider.GOOGLE,
      role: UserRole.CLIENT,
    };

    const user = await this.googleService.thirdLogin(details);

    if (!user) {
      const user = await this.googleService.thirdCreate(details);
      return user;
    }

    console.log('Validate');
    return user || null;
  }
}
