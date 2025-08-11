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
import { WildAnimalsService } from './wild-animals.service';
import { CreateWildAnimalDto } from '../dto';

@ApiTags('Wild Animals')
@Controller('api/wild-animals')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class WildAnimalsController {
  constructor(private readonly wildAnimalsService: WildAnimalsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new wild animal record' })
  @ApiResponse({ status: 201, description: 'Wild animal successfully created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createWildAnimalDto: CreateWildAnimalDto) {
    return this.wildAnimalsService.create(createWildAnimalDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all wild animals' })
  @ApiResponse({ status: 200, description: 'List of wild animals' })
  findAll() {
    return this.wildAnimalsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get wild animal by ID' })
  @ApiResponse({ status: 200, description: 'Wild animal details' })
  @ApiResponse({ status: 404, description: 'Wild animal not found' })
  findOne(@Param('id') id: string) {
    return this.wildAnimalsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update wild animal' })
  @ApiResponse({ status: 200, description: 'Wild animal successfully updated' })
  @ApiResponse({ status: 404, description: 'Wild animal not found' })
  update(@Param('id') id: string, @Body() updateWildAnimalDto: Partial<CreateWildAnimalDto>) {
    return this.wildAnimalsService.update(+id, updateWildAnimalDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete wild animal' })
  @ApiResponse({ status: 200, description: 'Wild animal successfully deleted' })
  @ApiResponse({ status: 404, description: 'Wild animal not found' })
  remove(@Param('id') id: string) {
    return this.wildAnimalsService.remove(+id);
  }
}