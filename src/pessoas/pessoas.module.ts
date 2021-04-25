import { Module } from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { PessoasController } from './pessoas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pessoa, PessoaSchema } from './entities/pessoa.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pessoa.name, schema: PessoaSchema }]),
  ],
  controllers: [PessoasController],
  providers: [PessoasService],
})
export class PessoasModule {}
