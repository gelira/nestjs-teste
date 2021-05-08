import { IsString, IsInt } from 'class-validator';

export class TesteSocketioDto {
  @IsString()
  sid: string;

  @IsInt()
  numero: number;
}
