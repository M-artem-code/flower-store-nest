import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('ORDER_SERVICE') private readonly client: ClientProxy) {}

  sendMessage() {
    this.client.emit('message', 'New order #2342!');
  }
}
