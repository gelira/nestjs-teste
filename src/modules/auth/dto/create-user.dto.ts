import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nome: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  senha: string;
}
