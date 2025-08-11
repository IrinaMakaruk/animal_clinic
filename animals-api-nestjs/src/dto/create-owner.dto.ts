import { IsString, IsEmail, IsOptional, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({ example: '123 Main St' })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ example: 'Anytown' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'NY' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ example: '12345' })
  @IsString()
  @IsNotEmpty()
  zipCode: string;
}

export class CreateOwnerDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiPropertyOptional({ example: '+1234567890' })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiPropertyOptional({ example: 'john@example.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  @IsOptional()
  address?: CreateAddressDto;
}