import { IsInt } from 'class-validator';

export class TesteDto {
  @IsInt()
  numero: number;
}
