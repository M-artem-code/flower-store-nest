import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatsService {
  constructor(private readonly prisma: PrismaService) {}

  async summary() {
    const [flowersCount, usersCount, priceAgg] = await Promise.all([
      this.prisma.flower.count(),
      this.prisma.user.count(),
      this.prisma.flower.aggregate({
        _min: { price: true },
        _max: { price: true },
        _avg: { price: true },
      }),
    ]);

    return {
      flowersCount,
      usersCount,
      price: {
        min: priceAgg._min.price,
        max: priceAgg._max.price,
        avg: priceAgg._avg.price,
      },
    };
  }

  async colors() {
    const rows = (await this.prisma.flower.groupBy({
      by: ['color'],
      _count: {
        _all: true,
      },
      orderBy: {
        _count: {
          _all: 'desc',
        },
      },
    })) as unknown as Array<{ color: string; _count: { _all: number } }>;

    return rows.map((r) => ({
      color: r.color,
      count: r._count._all,
    }));
  }
}
