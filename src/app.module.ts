import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PurchaseController } from './models/purchase/purchase.controller';
import { PurchaseService } from './models/purchase/purchase.service';
import { PurchaseModule } from './models/purchase/purchase.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { IncomesModule } from './models/incomes/incomes.module';
import { SettingsModule } from './models/settings/settings.module';
import { DatabaseConfig } from 'database/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks/tasks.service';
import { TasksModule } from './tasks/tasks.module';
import { TasksController } from './tasks/tasks.controller';
import { PaymentMethodModule } from './models/payment-method/payment-method.module';
import { PaymentMethodService } from './models/payment-method/payment-method.service';
import { PaymentMethodController } from './models/payment-method/payment-method.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(DatabaseConfig), // DATABASE
    ScheduleModule.forRoot(), // CRON TASKS
    TasksModule,
    AuthModule,
    PurchaseModule,
    IncomesModule,
    SettingsModule,
    PaymentMethodModule,
  ],
  controllers: [
    AppController,
    PurchaseController,
    TasksController,
    PaymentMethodController,
  ],
  providers: [AppService, PurchaseService, TasksService, PaymentMethodService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
