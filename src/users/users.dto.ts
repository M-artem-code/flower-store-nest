import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UsersCreateDTO {
  @IsString({
    message: 'Name must be a string',
  })
  @ApiProperty({
    example: 'Artem',
    required: true,
  })
  name!: string;

  @IsEmail()
  @ApiProperty({
    example: 'artem@example.com',
    required: true,
  })
  email!: string;
}

export class UsersUpdateDTO {
  @IsOptional()
  @IsString({
    message: 'Name must be a string',
  })
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
