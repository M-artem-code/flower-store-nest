import { Injectable, NotFoundException } from '@nestjs/common';
import { FlowersCreateDTO, FlowersUpdateDTO } from './flowers.dto';
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

  async findOne(id: number) {
    const flower = await this.prisma.flower.findUnique({
      where: { id },
    });

    if (!flower) throw new NotFoundException('flower not found');

    return flower;
  }

  async update(id: number, dto: FlowersUpdateDTO) {
    await this.findOne(id);

    return this.prisma.flower.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.flower.delete({
      where: { id },
    });
  }

  search(params: {
    name?: string;
    color?: string;
    minPrice?: number;
    maxPrice?: number;
  }) {
    const { name, color, minPrice, maxPrice } = params;

    return this.prisma.flower.findMany({
      where: {
        ...(name
          ? {
              name: {
                contains: name,
                mode: 'insensitive',
              },
            }
          : {}),
        ...(color
          ? {
              color: {
                equals: color,
                mode: 'insensitive',
              },
            }
          : {}),
        ...(minPrice !== undefined || maxPrice !== undefined
          ? {
              price: {
                ...(minPrice !== undefined ? { gte: minPrice } : {}),
                ...(maxPrice !== undefined ? { lte: maxPrice } : {}),
              },
            }
          : {}),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
