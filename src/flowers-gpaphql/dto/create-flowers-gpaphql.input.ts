import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFlowersGpaphqlInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
