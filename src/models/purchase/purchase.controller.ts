import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { Purchase } from './purchase.entity';
import { InsertResult } from 'typeorm';
import { FindPurchasesDTO } from './dto/find.dto';
import { validateUUID } from 'src/misc/dto/uuid.dto';
import { CreatePurchaseDTO } from './dto/create.dto';

@Controller('purchases')
export class PurchaseController {
  constructor(private readonly service: PurchaseService) {}
  @Get()
  async findAll(@Body() params: FindPurchasesDTO): Promise<Purchase[]> {
    return await this.service.findAll(params);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<Purchase | BadRequestException> {
    return validateUUID(id)
      ? await this.service.findOne(id)
      : new BadRequestException('Purchase ID provided is not valid.');
  }

  @Post()
  async create(@Body() data: CreatePurchaseDTO): Promise<InsertResult> {
    console.log(data);
    return await this.service.create(data);
  }
}
