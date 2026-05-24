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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../conceptions/guard';
import { UsersCreateDTO, UsersUpdateDTO } from './users.dto';
import { UsersSearchQueryDTO } from './users.query';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('search')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @UseGuards(AuthGuard)
  search(@Query() query: UsersSearchQueryDTO) {
    return this.usersService.search(query);
  }

  @Get('count')
  @UseGuards(AuthGuard)
  count() {
    return this.usersService.count();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  create(@Body() dto: UsersCreateDTO) {
    return this.usersService.create(dto);
  }

  @Get(':id/exists')
  @UseGuards(AuthGuard)
  exists(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.exists(id);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(AuthGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UsersUpdateDTO) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
