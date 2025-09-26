import { Controller, Get, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  async findOne(@Request() req: any): Promise<UserResponseDto> {
    const user = await this.userService.findOne({ id: req.user.id });
    return new UserResponseDto(user);
  }
}
