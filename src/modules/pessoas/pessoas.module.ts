import { Module } from '@nestjs/common';
import { PessoasService } from './services/pessoas.service';
import { PessoasController } from './controllers/pessoas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pessoa, PessoaSchema } from './entities/pessoa.entity';
import { AuthModule } from 'src/modules/auth/auth.module';
import { JobsModule } from '../jobs/jobs.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pessoa.name, schema: PessoaSchema }]),
    AuthModule,
    JobsModule,
  ],
  controllers: [PessoasController],
  providers: [PessoasService],
})
export class PessoasModule {}
