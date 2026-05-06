import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { MicroserviceService } from './microservice.service';

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
  handleMessage(message: string) {
    this.microserviceService.handleMessage(message);
  }
}
