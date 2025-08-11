import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PetsService } from './pets.service';
import { CreatePetDto } from '../dto';

@ApiTags('Pets')
@Controller('api/pets')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new pet' })
  @ApiResponse({ status: 201, description: 'Pet successfully created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createPetDto: CreatePetDto) {
    return this.petsService.create(createPetDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all pets' })
  @ApiResponse({ status: 200, description: 'List of pets' })
  findAll() {
    return this.petsService.findAll();
  }

  @Get('owner/:ownerId')
  @ApiOperation({ summary: 'Get pets by owner ID' })
  @ApiResponse({ status: 200, description: 'List of pets for owner' })
  findByOwner(@Param('ownerId') ownerId: string) {
    return this.petsService.findByOwner(+ownerId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get pet by ID' })
  @ApiResponse({ status: 200, description: 'Pet details' })
  @ApiResponse({ status: 404, description: 'Pet not found' })
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update pet' })
  @ApiResponse({ status: 200, description: 'Pet successfully updated' })
  @ApiResponse({ status: 404, description: 'Pet not found' })
  update(@Param('id') id: string, @Body() updatePetDto: Partial<CreatePetDto>) {
    return this.petsService.update(+id, updatePetDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete pet' })
  @ApiResponse({ status: 200, description: 'Pet successfully deleted' })
  @ApiResponse({ status: 404, description: 'Pet not found' })
  remove(@Param('id') id: string) {
    return this.petsService.remove(+id);
  }
}