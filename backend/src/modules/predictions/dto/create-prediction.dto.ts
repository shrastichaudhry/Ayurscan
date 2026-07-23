import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
} from 'class-validator';

export class CreatePredictionDto {
  @ApiProperty()
  @IsString()
  plantId!: string;

  @ApiProperty()
  @IsNumber()
  confidence!: number;

  @ApiProperty()
  @IsString()
  imageUrl!: string;
}