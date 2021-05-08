import { INestApplicationContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as redisIoAdapter from 'socket.io-redis';

export class RedisIoAdapter extends IoAdapter {
  private configService: ConfigService;

  constructor(
    configService: ConfigService,
    appOrHttpServer?: INestApplicationContext | any,
  ) {
    super(appOrHttpServer);
    this.configService = configService;
  }

  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);
    const redisAdapter = redisIoAdapter({
      host: this.configService.get<string>('REDIS_HOST'),
      port: parseInt(this.configService.get<string>('REDIS_PORT')),
      key: this.configService.get<string>('REDIS_SOCKETIO_KEY'),
    });

    server.adapter(redisAdapter);
    return server;
  }
}
