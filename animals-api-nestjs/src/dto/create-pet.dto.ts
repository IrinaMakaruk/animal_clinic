import { IsString, IsNumber, IsOptional, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePetDto {
  @ApiProperty({ example: 'Buddy' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 3 })
  @IsNumber()
  @IsOptional()
  age?: number;

  @ApiPropertyOptional({ example: 'Brown' })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiPropertyOptional({ example: 25.5 })
  @IsNumber()
  @IsOptional()
  weight?: number;

  @ApiPropertyOptional({ example: '2020-01-15' })
  @IsDateString()
  @IsOptional()
  dateOfBirth?: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  ownerId: number;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  speciesId?: number;
}