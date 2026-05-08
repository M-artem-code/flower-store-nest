import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { AuthGuard } from '../conceptions/guard';
import { LoggingInterceptor } from '../conceptions/interceptor';
import { FlowersCreateDTO } from './flowers.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('flowers')
@ApiTags('flowers')
@UseInterceptors(LoggingInterceptor)
export class FlowersController {
  constructor(private readonly flowersService: FlowersService) {}

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

  @Get('new-order')
  newOrder() {}
}
