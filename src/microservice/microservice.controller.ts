import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MicroserviceService } from './microservice.service';
import { OrderEventPayload } from '../orders/order-events.types';

@Controller()
export class MicroserviceController {
  constructor(private readonly microserviceService: MicroserviceService) {}

  // @MessagePattern('createMicroservice')
  // create(@Payload() createMicroserviceDto: CreateMicroserviceDto) {
  //   return this.microserviceService.create(createMicroserviceDto);
  // }

  // @MessagePattern('findAllMicroservice')
  // findAll() {
  //   return this.microserviceService.findAll();
  // }

  // @MessagePattern('findOneMicroservice')
  // findOne(@Payload() id: number) {
  //   return this.microserviceService.findOne(id);
  // }

  // @MessagePattern('updateMicroservice')
  // update(@Payload() updateMicroserviceDto: UpdateMicroserviceDto) {
  //   return this.microserviceService.update(updateMicroserviceDto.id, updateMicroserviceDto);
  // }

  // @MessagePattern('removeMicroservice')
  // remove(@Payload() id: number) {
  //   return this.microserviceService.remove(id);
  // }
  @EventPattern('message')
  handleMessage(@Payload() message: string) {
    this.microserviceService.handleMessage(message);
  }

  @EventPattern('order.created')
  handleOrderCreated(@Payload() payload: OrderEventPayload) {
    this.microserviceService.handleOrderCreated(payload);
  }
}
