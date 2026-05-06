import { Injectable } from '@nestjs/common';

@Injectable()
export class MicroserviceService {
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
    console.log('microservice:', message);
  }
}
