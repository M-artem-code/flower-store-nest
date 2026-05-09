import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FlowersCreateDTO {
  @IsString({
    message: 'Name must be a string',
  })
  @ApiProperty({
    example: 'Rose',
    required: true,
  })
  name!: string;

  @IsString()
  @ApiProperty({
    example: 'Red',
    required: true,
  })
  color!: string;

  @IsNumber()
  @ApiProperty({
    example: 10,
    required: true,
  })
  price!: number;
}

export class FlowersUpdateDTO {
  @IsOptional()
  @IsString({
    message: 'Name must be a string',
  })
  name?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsNumber()
  price?: number;
}

export type TFlowersUpdateDTO = Partial<FlowersCreateDTO>;
