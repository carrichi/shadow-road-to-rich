import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PurchaseController } from './models/purchase/purchase.controller';
import { PurchaseService } from './models/purchase/purchase.service';
import { PurchaseModule } from './models/purchase/purchase.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IncomesModule } from './models/incomes/incomes.module';
import { SettingsModule } from './models/settings/settings.module';
import { Purchase } from './models/purchase/purchase.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        database: configService.get('DATABASE_NAME'),
        username: configService.get('DATABASE_USER'),
        password: '' + configService.get('DATABASE_PASSWORD'),
        // synchronize: true,
        entities: [Purchase],
      }),
    }),
    AuthModule,
    PurchaseModule,
    IncomesModule,
    SettingsModule,
  ],
  controllers: [AppController, PurchaseController],
  providers: [AppService, PurchaseService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
