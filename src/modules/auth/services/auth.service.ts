import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUserLocal(email: string, senha: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (user !== null) {
      if (await bcrypt.compare(senha, user.senha)) {
        return user;
      }
    }
    return null;
  }

  generateToken(user) {
    const payload = {
      user_id: user.id,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
