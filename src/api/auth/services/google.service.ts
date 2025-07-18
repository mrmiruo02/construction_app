import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { UsersCreate } from '../models/userCreate.model';

@Injectable()
export class GoogleService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async thirdLogin(details: UsersCreate) {
    const user = await this.userRepository.findOneBy({ email: details.email });

    if (user) return user;
    const newUser = this.userRepository.create(details);
    return this.userRepository.save(newUser);
  }

  async thirdCreate(details: UsersCreate) {
    const user = this.userRepository.create(details);
    return this.userRepository.save(user);
  }

  async thirdFindUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }
}
