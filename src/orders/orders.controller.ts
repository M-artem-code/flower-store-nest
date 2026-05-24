import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderEventsService } from './order-events.service';
import { OrderMessageDTO, OrderQuoteDTO } from './orders.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(
    private readonly orderEvents: OrderEventsService,
    private readonly ordersService: OrdersService,
  ) {}

  @Get('ping')
  ping() {
    return {
      status: 'ok',
      service: 'orders',
      timestamp: new Date().toISOString(),
    };
  }

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

  @Post('quote')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  quote(@Body() dto: OrderQuoteDTO) {
    return this.ordersService.quote(dto.flowerIds);
  }

  @Post('message')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  emitMessage(@Body() dto: OrderMessageDTO) {
    this.orderEvents.emitLegacyMessage(dto.message);
    return {
      status: 'ok',
      channel: 'tcp',
      event: 'message',
      message: dto.message,
    };
  }
}
