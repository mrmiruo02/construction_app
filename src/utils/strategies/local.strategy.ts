import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '../../auth/services/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly loginService: UserService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.loginService.login({ email, password });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
