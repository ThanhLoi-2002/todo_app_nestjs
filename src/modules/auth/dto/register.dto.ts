import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Mật khẩu phải ít nhất 6 ký tự' })
  password: string;
}
