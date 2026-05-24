import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UsersSearchQueryDTO {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @ApiPropertyOptional({ example: 'anna@example.com' })
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @ApiPropertyOptional({ example: 'Anna' })
  name?: string;
}
