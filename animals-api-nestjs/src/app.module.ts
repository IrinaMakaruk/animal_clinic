import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getDatabaseConfig } from './config/database.config';

// Import all entity modules
import { AuthModule } from './auth/auth.module';
import { OwnersModule } from './owners/owners.module';
import { PetsModule } from './pets/pets.module';
import { WildAnimalsModule } from './wild-animals/wild-animals.module';
import { SpeciesModule } from './species/species.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),
    AuthModule,
    OwnersModule,
    PetsModule,
    WildAnimalsModule,
    SpeciesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}