import { IsOptional, IsString } from 'class-validator';

export class FlowersSearchQueryDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  color?: string;
}
