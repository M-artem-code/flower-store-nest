import { Controller, Get, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
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

  @Get('recent')
  @UseGuards(AuthGuard)
  recent(@Query('limit', new ParseIntPipe({ optional: true })) limit?: number) {
    return this.statsService.recent(limit ?? 5);
  }

  @Get('prices')
  @UseGuards(AuthGuard)
  prices() {
    return this.statsService.priceRanges();
  }
}
