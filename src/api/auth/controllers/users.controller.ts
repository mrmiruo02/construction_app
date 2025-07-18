import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Response,
  UsePipes,
  Delete,
} from '@nestjs/common';
import { UserService } from '../services/users.service';
import { LoginModel, loginModel } from '../models/login.model';
import { Response as ResType } from 'express';
import { usersCreate, UsersCreate } from '../models/userCreate.model';
import { usersUpdate, UsersUpdate } from '../models/userUpdate.model';
import { ZodValidationPipe } from 'src/pipe/zodValidation.pipe';
import { UsersDelete } from '../models/userDelete.model';
import { JwtAuthGuard } from 'src/utils/guards/jwt.guard';
import { LocalGuard } from 'src/utils/guards/local.guard';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(usersCreate))
  async create(@Body() body: UsersCreate) {
    return this.userService.create(body);
  }

  @Post('update')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(usersUpdate))
  async update(@Body() body: UsersUpdate) {
    return this.userService.update(body);
  }

  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  async delete(@Body() body: UsersDelete) {
    return this.userService.delete(body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Post('login')
  @UseGuards(LocalGuard)
  async login(
    @Body(new ZodValidationPipe(loginModel)) body: LoginModel,
    @Response({ passthrough: true }) res: ResType,
  ) {
    const token = await this.userService.login(body);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return { message: 'login successfully' };
  }

  @Post('logout')
  logout(@Response({ passthrough: true }) res: ResType) {
    res.clearCookie('access_token');
    return { message: 'Logged out' };
  }
}
