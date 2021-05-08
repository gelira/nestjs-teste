import { Module } from '@nestjs/common';
import { PessoasService } from './services/pessoas.service';
import { PessoasController } from './controllers/pessoas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pessoa, PessoaSchema } from './entities/pessoa.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TesteModule } from 'src/teste/teste.module';
import { TesteGateway } from './gateways/teste.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pessoa.name, schema: PessoaSchema }]),
    AuthModule,
    TesteModule,
  ],
  controllers: [PessoasController],
  providers: [PessoasService, TesteGateway],
})
export class PessoasModule {}
