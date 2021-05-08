import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { NotificationsService } from 'src/modules/notifications/services/notifications.service';

@Controller()
export class JobsController {
  constructor(private notificationsService: NotificationsService) {}

  @EventPattern('pessoa_created')
  async pessoaCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    this.notificationsService.emitEvent('pessoa_created', data);

    // channel.nack(originalMsg);
    channel.ack(originalMsg);
  }
}
