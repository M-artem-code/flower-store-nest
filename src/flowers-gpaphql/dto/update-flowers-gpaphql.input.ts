import { CreateFlowersGpaphqlInput } from './create-flowers-gpaphql.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFlowersGpaphqlInput extends PartialType(
  CreateFlowersGpaphqlInput,
) {
  @Field(() => Int)
  id: number;
}
