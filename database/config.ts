import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Purchase } from 'src/models/purchase/purchase.entity';

export const DatabaseConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    port: configService.get('DATABASE_PORT'),
    database: configService.get('DATABASE_NAME'),
    username: configService.get('DATABASE_USER'),
    password: '' + configService.get('DATABASE_PASSWORD'),
    entities: [Purchase],
  }),
};
