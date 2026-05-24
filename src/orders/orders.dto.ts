import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsInt, IsString, MinLength } from 'class-validator';

export class OrderQuoteDTO {
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  @ApiProperty({ example: [1, 2, 3] })
  flowerIds!: number[];
}

export class OrderMessageDTO {
  @IsString()
  @MinLength(1)
  @ApiProperty({ example: 'Hello from orders API' })
  message!: string;
}
