import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { PurchaseModule } from 'src/models/purchase/purchase.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule, PurchaseModule],
  providers: [ConfigService, TasksService],
  exports: [ConfigService],
})
export class TasksModule {}
