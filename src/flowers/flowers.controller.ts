import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { AuthGuard } from '../conceptions/guard';
import { LoggingInterceptor } from '../conceptions/interceptor';
import { FlowersCreateDTO, FlowersUpdateDTO } from './flowers.dto';
import { FlowersSearchQueryDTO } from './flowers.query';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { OptionalParseFloatPipe } from '../common/pipes/optional-parse-float.pipe';

@Controller('flowers')
@ApiTags('flowers')
@UseInterceptors(LoggingInterceptor)
export class FlowersController {
  constructor(private readonly flowersService: FlowersService) {}

  @Get('colors')
  @UseGuards(AuthGuard)
  colors() {
    return this.flowersService.findColors();
  }

  @Get('count')
  @UseGuards(AuthGuard)
  count() {
    return this.flowersService.count();
  }

  @Get('top')
  @UseGuards(AuthGuard)
  top(@Query('limit', new ParseIntPipe({ optional: true })) limit?: number) {
    return this.flowersService.findTop(limit ?? 5);
  }

  @Get('cheapest')
  @UseGuards(AuthGuard)
  cheapest() {
    return this.flowersService.findCheapest();
  }

  @Get('expensive')
  @UseGuards(AuthGuard)
  expensive() {
    return this.flowersService.findMostExpensive();
  }

  @Get('by-color/:color')
  @UseGuards(AuthGuard)
  byColor(@Param('color') color: string) {
    return this.flowersService.findByColor(color);
  }

  @Get('search')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @UseGuards(AuthGuard)
  search(
    @Query() query: FlowersSearchQueryDTO,
    @Query('minPrice', OptionalParseFloatPipe) minPrice?: number,
    @Query('maxPrice', OptionalParseFloatPipe) maxPrice?: number,
  ) {
    return this.flowersService.search({
      ...query,
      minPrice,
      maxPrice,
    });
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.flowersService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 201,
  })
  @ApiResponse({
    type: FlowersCreateDTO,
    description: 'Json structure for flower object.',
  })
  create(@Body() dto: FlowersCreateDTO) {
    return this.flowersService.create(dto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.flowersService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(AuthGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: FlowersUpdateDTO) {
    return this.flowersService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.flowersService.remove(id);
  }
}
