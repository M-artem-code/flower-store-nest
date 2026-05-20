import { Injectable } from '@nestjs/common';
import { OrderEventsService } from './orders/order-events.service';

@Injectable()
export class AppService {
  constructor(private readonly orderEvents: OrderEventsService) {}

  sendMessage() {
    this.orderEvents.emitLegacyMessage('New order #2342!');
  }
}
