import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderEventsService } from './order-events.service';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly orderEvents: OrderEventsService) {}

  @Get('notify')
  notify(@Query('orderId') orderId?: string) {
    const payload = this.orderEvents.notify(orderId);
    return {
      status: 'ok',
      channel: 'tcp',
      event: 'order.created',
      payload,
    };
  }
}
