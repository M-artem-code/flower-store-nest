import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersCreateDTO, UsersUpdateDTO } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  count() {
    return this.prisma.user.count();
  }

  search(params: { email?: string; name?: string }) {
    const { email, name } = params;
    return this.prisma.user.findMany({
      where: {
        ...(email
          ? {
              email: {
                contains: email,
                mode: 'insensitive',
              },
            }
          : {}),
        ...(name
          ? {
              name: {
                contains: name,
                mode: 'insensitive',
              },
            }
          : {}),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async exists(id: number) {
    const count = await this.prisma.user.count({ where: { id } });
    return { id, exists: count > 0 };
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
