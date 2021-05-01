import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'senha',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUserLocal(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
