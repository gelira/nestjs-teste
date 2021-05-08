import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './modules/pessoas/gateways/redis.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: ['*'],
  });

  app.useWebSocketAdapter(new RedisIoAdapter(configService, app));

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
    }),
  );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('RABBITMQ_CONNECTION')],
      queue: configService.get<string>('RABBITMQ_QUEUE'),
      noAck: false,
    },
  });

  await app.startAllMicroservicesAsync();
  await app.listen(3000);
}
bootstrap();
