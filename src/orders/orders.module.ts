import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrderEventsService } from './order-events.service';
import { OrdersController } from './orders.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrderEventsService],
  exports: [OrderEventsService],
})
export class OrdersModule {}
