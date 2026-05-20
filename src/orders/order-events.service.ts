import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrderEventPayload } from './order-events.types';

@Injectable()
export class OrderEventsService {
  constructor(@Inject('ORDER_SERVICE') private readonly client: ClientProxy) {}

  emitLegacyMessage(message: string): void {
    this.client.emit('message', message);
  }

  notify(orderId?: string): OrderEventPayload {
    const id = orderId?.trim() || `ord-${Date.now()}`;
    const payload: OrderEventPayload = {
      orderId: id,
      source: 'orders',
      message: `New order ${id}`,
      timestamp: new Date().toISOString(),
    };

    this.client.emit<OrderEventPayload>('order.created', payload);
    return payload;
  }
}
