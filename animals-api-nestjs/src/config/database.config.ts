import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  const nodeEnv = configService.get('NODE_ENV', 'development');
  
  // Use SQLite for development/testing
  if (nodeEnv === 'development' || nodeEnv === 'test') {
    return {
      type: 'sqlite',
      database: 'animals.db',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: false,
    };
  }

  // Use PostgreSQL for production
  return {
    type: 'postgres',
    url: 'postgres://eheqeuaz:WLbvY2YGV3STgTeM4hfV1vaFravGB74N@ruby.db.elephantsql.com:5432/eheqeuaz',
    host: 'ruby.db.elephantsql.com',
    port: 5432,
    username: 'eheqeuaz',
    password: 'WLbvY2YGV3STgTeM4hfV1vaFravGB74N',
    database: 'eheqeuaz',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false, // Set to false in production
    logging: false,
    ssl: {
      rejectUnauthorized: false,
    },
  };
};