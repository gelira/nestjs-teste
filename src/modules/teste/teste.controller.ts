import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { SocketioEmitterService } from 'src/modules/pessoas/services/socketio-emitter.service';

interface TesteData {
  numero: number;
  time: number;
  sid: string;
}

@Controller()
export class TesteController {
  constructor(private socketIoEmitterService: SocketioEmitterService) {}

  @EventPattern('quadrado')
  async teste(@Payload() data: TesteData, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    console.log(originalMsg.content.toString());

    if (data.time > new Date().getTime()) {
      console.log('Requeing...');
      await new Promise((resolve) => {
        setTimeout(() => resolve(null), 2000);
      });
      channel.nack(originalMsg);
      return;
    }

    this.socketIoEmitterService.emitEvent('quadrado', data.sid, {
      resultado: data.numero * data.numero,
    });
    channel.ack(originalMsg);
  }
}
