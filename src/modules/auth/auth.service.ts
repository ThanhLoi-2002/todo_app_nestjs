import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/entities/user.entity';
import { JwtPayload } from './strategies/jwt.strategy';
import { AppLogger } from 'src/common/services/logger.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly logger: AppLogger,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Partial<UserEntity> | null> {
    const user = await this.userService.findOne({ username });

    if (user && (await user.validatePassword(pass))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.validateUser(loginDto.username, loginDto.password);

    if (!user) {
      this.logger.warn(`Sai tài khoản hoặc mật khẩu: ${loginDto.username}`);
      throw new BadRequestException('Sai tài khoản hoặc mật khẩu');
    }

    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    // Generate tokens
    const accessToken = this.jwtService.sign(payload);
    this.logger.log(`User login: ${loginDto.username}`);
    return { accessToken };
  }

  async register(registerDto: RegisterDto): Promise<UserEntity> {
    const data = await this.userService.findOne({
      username: registerDto.username,
    });
    if (data) {
      throw new BadRequestException('Username đã tồn tại!');
    }

    const user = await this.userService.create(registerDto);
    return user;
  }

  async createAdmin(registerDto: RegisterDto): Promise<UserEntity> {
    const data = await this.userService.findOne({
      username: registerDto.username,
    });
    if (data) {
      throw new BadRequestException('Username đã tồn tại!');
    }

    const user = await this.userService.createAdmin(registerDto);
    return user;
  }
}
