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
import { OwnersService } from './owners.service';
import { CreateOwnerDto } from '../dto';

@ApiTags('Owners')
@Controller('api/owners')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class OwnersController {
  constructor(private readonly ownersService: OwnersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new owner' })
  @ApiResponse({ status: 201, description: 'Owner successfully created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createOwnerDto: CreateOwnerDto) {
    return this.ownersService.create(createOwnerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all owners' })
  @ApiResponse({ status: 200, description: 'List of owners' })
  findAll() {
    return this.ownersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get owner by ID' })
  @ApiResponse({ status: 200, description: 'Owner details' })
  @ApiResponse({ status: 404, description: 'Owner not found' })
  findOne(@Param('id') id: string) {
    return this.ownersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update owner' })
  @ApiResponse({ status: 200, description: 'Owner successfully updated' })
  @ApiResponse({ status: 404, description: 'Owner not found' })
  update(@Param('id') id: string, @Body() updateOwnerDto: Partial<CreateOwnerDto>) {
    return this.ownersService.update(+id, updateOwnerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete owner' })
  @ApiResponse({ status: 200, description: 'Owner successfully deleted' })
  @ApiResponse({ status: 404, description: 'Owner not found' })
  remove(@Param('id') id: string) {
    return this.ownersService.remove(+id);
  }
}