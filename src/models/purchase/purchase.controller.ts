import { Body, Controller, Get, Post } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { Purchase } from './purchase.entity';
import { InsertResult } from 'typeorm';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly service: PurchaseService) {}
  @Get()
  async findAll(): Promise<Purchase[]> {
    return await this.service.findAll();
  }

  @Post()
  async create(@Body() data): Promise<InsertResult> {
    console.log(data);
    return await this.service.create(data);
  }
}
