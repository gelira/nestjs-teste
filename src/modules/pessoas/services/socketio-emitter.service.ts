import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Emitter } from '@socket.io/redis-emitter';
import { createClient } from 'redis';

@Injectable()
export class SocketioEmitterService {
  private emitter: Emitter;

  constructor(private configService: ConfigService) {}

  private getEmitter() {
    if (!this.emitter) {
      const redisClient = createClient({
        host: this.configService.get<string>('REDIS_HOST'),
        port: parseInt(this.configService.get<string>('REDIS_PORT')),
        return_buffers: true,
      });
      this.emitter = new Emitter(redisClient, {
        key: this.configService.get<string>('REDIS_SOCKETIO_KEY'),
      });
    }
    return this.emitter;
  }

  emitEvent(event: string, room: string | string[], data: any) {
    this.getEmitter().to(room).emit(event, data);
  }
}
