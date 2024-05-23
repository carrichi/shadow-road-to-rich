import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { PurchaseModule } from 'src/models/purchase/purchase.module';

@Module({
  imports: [PurchaseModule],
  providers: [TasksService],
})
export class TasksModule {}
