import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersCreateDTO, UsersUpdateDTO } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  create(dto: UsersCreateDTO) {
    return this.prisma.user.create({
      data: dto,
    });
  }

  async findOne(id: number) {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: { id },
      });
    } catch {
      throw new NotFoundException('user not found');
    }
  }

  async update(id: number, dto: UsersUpdateDTO) {
    await this.findOne(id);

    return this.prisma.user.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
