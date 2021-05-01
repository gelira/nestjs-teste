import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUserLocal(email: string, senha: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (user !== null) {
      if (await bcrypt.compare(senha, user.senha)) {
        return user;
      }
    }
    return null;
  }
}
