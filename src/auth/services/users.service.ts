import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginModel } from '../models/login.model';
import { UsersCreate } from '../models/userCreate.model';
import { UsersUpdate } from '../models/userUpdate.model';
import { UsersDelete } from '../models/userDelete.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async create(param: UsersCreate) {
    const hashedPassword = await bcrypt.hash(param.password!, 10);
    const createUser = {
      name: param.name,
      password: hashedPassword,
      email: param.email,
      role: param.role,
    };
    const user = this.userRepository.create(createUser);
    return this.userRepository.save(user);
  }

  async update(updateData: UsersUpdate) {
    const user = await this.userRepository.findOneBy({ id: updateData.id });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    Object.assign(user, updateData);
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  async delete(user: UsersDelete) {
    const { id } = user;
    const result = await this.userRepository
      .createQueryBuilder('users')
      .where('users.id = :id', {
        id,
      })
      .getOne();

    if (!result) {
      throw new NotFoundException('user not found');
    }
    await this.userRepository.delete(id);

    return result;
  }

  async login(user: LoginModel) {
    const { email, password } = user;
    const result = await this.userRepository
      .createQueryBuilder('users')
      .where('users.email = :email', {
        email,
      })
      .getOne();

    if (!result) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, result.password);

    if (isMatch) {
      const token = this.jwtService.sign({
        userId: result?.id,
        email: result?.email,
      });
      return token;
    } else {
      throw new UnauthorizedException('Wrong Password');
    }
  }
}
