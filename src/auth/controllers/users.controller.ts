import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() request) {
    const user = await this.usersService.findUserById(request.user.id);
    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
    };
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.createUser(createUserDto);
      return {
        nome: user.nome,
        email: user.email,
      };
    } catch (e) {
      throw new UnprocessableEntityException([e.message]);
    }
  }
}
