import { Injectable, Logger } from '@nestjs/common';
import purchaseReminder from './jobs/purchaseReminder';
import { PurchaseService } from 'src/models/purchase/purchase.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TasksService {
  constructor(
    private purchaseService: PurchaseService,
    private configService: ConfigService,
  ) {}
  private readonly logger = new Logger(TasksService.name);

  async purchaseDailyReminder() {
    const config: { token: string; chat_id: string } = {
      token: this.configService.get('BOT_TOKEN'),
      chat_id: this.configService.get('CHAT_ID'),
    };
    this.logger.debug('Time to check pending purchases!');
    this.logger.debug('Verifing...');
    await purchaseReminder(this.purchaseService, config);
    this.logger.debug('Finished cron.');
  }
}
