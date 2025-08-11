import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WildAnimal, Species } from '../entities';
import { WildAnimalsService } from './wild-animals.service';
import { WildAnimalsController } from './wild-animals.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WildAnimal, Species])],
  controllers: [WildAnimalsController],
  providers: [WildAnimalsService],
  exports: [WildAnimalsService],
})
export class WildAnimalsModule {}