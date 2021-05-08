import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { NotificationsService } from 'src/modules/notifications/services/notifications.service';

@Controller()
export class JobsController {
  constructor(private notificationsService: NotificationsService) {}

  @EventPattern('quadrado')
  async teste(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    const resultado = Math.pow(data.numero, 2);
    console.log(resultado);
    this.notificationsService.emitEvent('quadrado', { resultado });

    // channel.nack(originalMsg);
    channel.ack(originalMsg);
  }
}
