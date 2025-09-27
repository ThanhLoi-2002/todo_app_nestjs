import { Exclude, Expose } from 'class-transformer';
import { UserEntity, UserRoleType } from '../entities/user.entity';

@Exclude()
export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  role: UserRoleType;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
