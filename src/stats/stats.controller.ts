import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../conceptions/guard';
import { StatsService } from './stats.service';

@Controller('stats')
@ApiTags('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('summary')
  @UseGuards(AuthGuard)
  summary() {
    return this.statsService.summary();
  }

  @Get('colors')
  @UseGuards(AuthGuard)
  colors() {
    return this.statsService.colors();
  }
}
