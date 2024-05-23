import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import purchaseReminder from './jobs/purchaseReminder';
import { PurchaseService } from 'src/models/purchase/purchase.service';

@Injectable()
export class TasksService {
  constructor(private purchaseService: PurchaseService) {}
  private readonly logger = new Logger(TasksService.name);

  @Cron('0 12 * * * *')
  async handleInterval() {
    this.logger.debug('Time to check pending purchases!');
    this.logger.debug('Verifing...');
    await purchaseReminder(this.purchaseService);
    this.logger.debug('Finished cron.');
  }
}
