import { Injectable } from '@nestjs/common';
import { FlowersCreateDTO } from './flowers.dto';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FlowersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  findAll() {
    // console.log(this.configService.get<EnumAppMode>('MODE'));
    return this.prisma.flower.findMany();

    // return [
    //   {
    //     name: 'Rose',
    //     color: 'red',
    //     price: 10,
    //   },
    //   {
    //     name: 'Lily',
    //     color: 'white',
    //     price: 15,
    //   },
    //   {
    //     name: 'Tulip',
    //     color: 'pink',
    //     price: 20,
    //   },
    // ];
  }

  create(dto: FlowersCreateDTO) {
    return this.prisma.flower.create({
      data: dto,
    });
  }
}
