import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'Shrasti Chaudhary',
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    example: 'shrasti@gmail.com',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'Password@123',
  })
  @IsString()
  @MinLength(8)
  password!: string;
}