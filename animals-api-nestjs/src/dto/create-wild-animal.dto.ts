import { IsString, IsNumber, IsOptional, IsNotEmpty, IsBoolean, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateWildAnimalDto {
  @ApiProperty({ example: 'Wolf Alpha' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 5 })
  @IsNumber()
  @IsOptional()
  age?: number;

  @ApiPropertyOptional({ example: 'Forest' })
  @IsString()
  @IsOptional()
  habitat?: string;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  isEndangered?: boolean;

  @ApiPropertyOptional({ example: '2024-01-15' })
  @IsDateString()
  @IsOptional()
  dateFound?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  speciesId?: number;
}