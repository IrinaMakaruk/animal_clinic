import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet, Owner, Species } from '../entities';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pet, Owner, Species])],
  controllers: [PetsController],
  providers: [PetsService],
  exports: [PetsService],
})
export class PetsModule {}