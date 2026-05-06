import { Module } from '@nestjs/common';
import { FlowersGpaphqlResolver } from './flowers-gpaphql.resolver';
import { FlowersService } from 'src/flowers/flowers.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [FlowersGpaphqlResolver, FlowersService, PrismaService],
})
export class FlowersGpaphqlModule {}
