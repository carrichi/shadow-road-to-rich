import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller()
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @Get('tasks/purchases/daily-reminder')
  async puchasesDailyReminder(): Promise<any> {
    return await this.service.purchaseDailyReminder();
  }
}
