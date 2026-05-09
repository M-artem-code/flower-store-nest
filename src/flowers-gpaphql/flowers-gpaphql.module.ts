import { Module } from '@nestjs/common';
import { FlowersGpaphqlResolver } from './flowers-gpaphql.resolver';
import { FlowersModule } from 'src/flowers/flowers.module';

@Module({
  imports: [FlowersModule],
  providers: [FlowersGpaphqlResolver],
})
export class FlowersGpaphqlModule {}
