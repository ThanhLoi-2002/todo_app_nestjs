import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';
import { Request } from 'express';
import { AuthService } from '../auth.service';

export interface JwtPayload {
  id: string;
  username: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload): Promise<any> {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Không tìm thấy token');
    }

    console.log('JwtStrategy.validate:', payload);

    const user = await this.userService.findOne({ id: payload.id });

    if (!user) {
      throw new UnauthorizedException('User không tìm thấy.');
    }

    return user;
  }
}
