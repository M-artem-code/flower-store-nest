import { Module } from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { FlowersController } from './flowers.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Импортируем модуль с Prisma
  controllers: [FlowersController],
  providers: [FlowersService], // Только сервис, который уникален для этого модуля
})
export class FlowersModule {}
