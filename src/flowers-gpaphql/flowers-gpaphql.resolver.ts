import { Query, Resolver } from '@nestjs/graphql';
import { FlowersGpaphql } from './entities/flowers-gpaphql.entity';
import { FlowersService } from '../flowers/flowers.service';
import { FlowerModel } from './flower.model';

@Resolver(() => FlowersGpaphql)
export class FlowersGpaphqlResolver {
  constructor(private readonly flowersService: FlowersService) {}

  @Query(() => [FlowerModel], { name: 'flowers' })
  findAll() {
    return this.flowersService.findAll();
  }
}
