import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

interface TesteData {
  numero: number;
  time: number;
}

@Controller()
export class TesteController {
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

    console.log(`Result: ${data.numero * data.numero}`);
    channel.ack(originalMsg);
  }
}
