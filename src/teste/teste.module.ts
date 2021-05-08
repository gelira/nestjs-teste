import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { TesteController } from './teste.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'TESTE_SERVICE',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_CONNECTION')],
            queue: configService.get<string>('RABBITMQ_QUEUE'),
            noAck: false,
          },
        }),
      },
    ]),
    forwardRef(() => PessoasModule),
  ],
  controllers: [TesteController],
  providers: [
    {
      provide: 'TESTE_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_CONNECTION')],
            queue: configService.get<string>('RABBITMQ_QUEUE'),
            noAck: false,
          },
        });
      },
    },
  ],
  exports: ['TESTE_SERVICE'],
})
export class TesteModule {}
