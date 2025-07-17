import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { Response as ResType, Request } from 'express';
import { GoogleAuthGuard } from 'src/utils/guards/google.guard';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { GoogleService } from '../services/google.service';

@Controller('auth')
export class GoogleController {
  constructor(
    @InjectRepository(Users)
    private readonly googleService: GoogleService,
    private readonly jwtService: JwtService,
  ) {}
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google Authentication' };
  }

  // auth/google/redirect
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect(@Req() request: Request, @Res() res: ResType) {
    const user = request.user as Users;

    const payload = { email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    });

    return res.json({
      msg: 'OK',
      token: token,
    });
  }

  @Get('status')
  user(@Req() request: Request) {
    console.log(request.user);
    if (request.user) {
      return { msg: 'Authenticated' };
    } else {
      return { msg: 'Not Authenticated' };
    }
  }
}
