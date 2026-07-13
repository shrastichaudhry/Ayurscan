import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePlantDto {
  @IsString()
  @IsNotEmpty()
  commonName!: string;

  @IsString()
  @IsNotEmpty()
  scientificName!: string;

  @IsString()
  @IsNotEmpty()
  family!: string;

  @IsString()
  @IsNotEmpty()
  medicinalUses!: string;

  @IsString()
  @IsNotEmpty()
  precautions!: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}