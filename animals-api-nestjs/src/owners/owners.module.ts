import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner, Address } from '../entities';
import { OwnersService } from './owners.service';
import { OwnersController } from './owners.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Owner, Address])],
  controllers: [OwnersController],
  providers: [OwnersService],
  exports: [OwnersService],
})
export class OwnersModule {}