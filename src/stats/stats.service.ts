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

  async recent(limit = 5) {
    return this.prisma.flower.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        name: true,
        color: true,
        price: true,
        createdAt: true,
      },
    });
  }

  async priceRanges() {
    const [under10, from10to20, over20] = await Promise.all([
      this.prisma.flower.count({ where: { price: { lt: 10 } } }),
      this.prisma.flower.count({
        where: { price: { gte: 10, lte: 20 } },
      }),
      this.prisma.flower.count({ where: { price: { gt: 20 } } }),
    ]);

    return {
      under10,
      from10to20,
      over20,
    };
  }

  async colors() {
    const rows = await this.prisma.flower.groupBy({
      by: ['color'],
      _count: {
        _all: true,
      },
    });

    return rows
      .map((r) => ({
        color: r.color,
        count: r._count._all,
      }))
      .sort((a, b) => b.count - a.count);
  }
}
