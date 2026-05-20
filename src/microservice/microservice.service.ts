import { Injectable, Logger } from '@nestjs/common';
import { OrderEventPayload } from '../orders/order-events.types';

@Injectable()
export class MicroserviceService {
  private readonly logger = new Logger(MicroserviceService.name);
  // create(createMicroserviceDto: CreateMicroserviceDto) {
  //   return 'This action adds a new microservice';
  // }
  // findAll() {
  //   return `This action returns all microservice`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} microservice`;
  // }
  // update(id: number, updateMicroserviceDto: UpdateMicroserviceDto) {
  //   return `This action updates a #${id} microservice`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} microservice`;
  // }
  handleMessage(message: string) {
    this.logger.log(`legacy message: ${message}`);
  }

  handleOrderCreated(payload: OrderEventPayload) {
    this.logger.log(
      `order.created [${payload.orderId}] from ${payload.source}: ${payload.message} @ ${payload.timestamp}`,
    );
  }
}
