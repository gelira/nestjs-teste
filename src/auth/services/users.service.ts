import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async checkEmailUsed(email: string) {
    const user = await this.userModel.findOne({ email });
    return user !== null;
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email, nome, senha } = createUserDto;
    if (await this.checkEmailUsed(email)) {
      throw new Error('email already used');
    }
    const hashedSenha = await bcrypt.hash(senha, 10);
    const user = new this.userModel({ email, nome, senha: hashedSenha });
    return user.save();
  }

  async findUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}
