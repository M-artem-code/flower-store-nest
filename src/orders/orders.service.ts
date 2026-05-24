import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async quote(flowerIds: number[]) {
    const uniqueIds = [...new Set(flowerIds)];
    const flowers = await this.prisma.flower.findMany({
      where: { id: { in: uniqueIds } },
    });

    if (flowers.length !== uniqueIds.length) {
      const found = new Set(flowers.map((f) => f.id));
      const missing = uniqueIds.filter((id) => !found.has(id));
      throw new NotFoundException(`flowers not found: ${missing.join(', ')}`);
    }

    const items = uniqueIds.map((id) => {
      const flower = flowers.find((f) => f.id === id)!;
      return {
        flowerId: flower.id,
        name: flower.name,
        price: flower.price,
      };
    });

    const total = items.reduce((sum, item) => sum + item.price, 0);

    return {
      items,
      total: Math.round(total * 100) / 100,
      currency: 'RUB',
      itemCount: items.length,
    };
  }
}
