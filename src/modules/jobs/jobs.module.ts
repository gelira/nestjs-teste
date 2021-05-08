import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { NotificationsModule } from '../notifications/notifications.module';
import { JobsController } from './controllers/jobs.controller';

@Module({
  imports: [NotificationsModule],
  controllers: [JobsController],
  providers: [
    {
      provide: 'JOBS_SERVICE',
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
  exports: ['JOBS_SERVICE'],
})
export class JobsModule {}
