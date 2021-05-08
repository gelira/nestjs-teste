import { IsString, IsInt, Min, IsIn } from 'class-validator';

export class CreatePessoaDto {
  @IsString()
  nome: string;

  @IsInt()
  @Min(0)
  idade: number;

  @IsString()
  @IsIn(['M', 'F'])
  sexo: string;
}
