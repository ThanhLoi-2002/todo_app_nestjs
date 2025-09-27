import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity, UserRoleType } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create({
      ...dto,
      role: UserRoleType.USER,
    });
    return this.userRepository.save(user);
  }

  async createAdmin(dto: CreateUserDto): Promise<UserEntity> {
    const admin = this.userRepository.create({
      ...dto,
      role: UserRoleType.ADMIN,
    });
    return this.userRepository.save(admin);
  }

  async findOne(where: any): Promise<UserEntity> {
    return this.userRepository.findOne({ where });
  }
}
