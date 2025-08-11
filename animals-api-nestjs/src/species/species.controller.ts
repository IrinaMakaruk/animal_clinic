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
import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from '../dto';

@ApiTags('Species')
@Controller('api/species')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new species' })
  @ApiResponse({ status: 201, description: 'Species successfully created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createSpeciesDto: CreateSpeciesDto) {
    return this.speciesService.create(createSpeciesDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all species' })
  @ApiResponse({ status: 200, description: 'List of species' })
  findAll() {
    return this.speciesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get species by ID' })
  @ApiResponse({ status: 200, description: 'Species details' })
  @ApiResponse({ status: 404, description: 'Species not found' })
  findOne(@Param('id') id: string) {
    return this.speciesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update species' })
  @ApiResponse({ status: 200, description: 'Species successfully updated' })
  @ApiResponse({ status: 404, description: 'Species not found' })
  update(@Param('id') id: string, @Body() updateSpeciesDto: Partial<CreateSpeciesDto>) {
    return this.speciesService.update(+id, updateSpeciesDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete species' })
  @ApiResponse({ status: 200, description: 'Species successfully deleted' })
  @ApiResponse({ status: 404, description: 'Species not found' })
  remove(@Param('id') id: string) {
    return this.speciesService.remove(+id);
  }
}