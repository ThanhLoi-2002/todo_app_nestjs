import { Controller, Get, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToClass } from 'class-transformer';
import { Roles } from '../auth/decorators/role.decorator';
import { UserRoleType } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @Roles([UserRoleType.USER, UserRoleType.ADMIN])
  async findOne(@Request() req: any): Promise<UserResponseDto> {
    const user = await this.userService.findOne({ id: req.user.id });
    return plainToClass(UserResponseDto, user);
  }
}
