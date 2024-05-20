import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { Purchase } from './purchase.entity';
import { FindPurchasesDTO } from './dto/find.dto';
import { validateUUID } from 'src/misc/dto/uuid.dto';
import { CreatePurchaseDTO } from './dto/create.dto';
import { UpdatePurchaseDTO } from './dto/update.dto';

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
  async create(@Body() data: CreatePurchaseDTO): Promise<Purchase> {
    console.log(data);
    return await this.service.create(data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdatePurchaseDTO,
  ): Promise<Purchase> {
    return validateUUID(id)
      ? await this.service.update(id, data)
      : new BadRequestException('Purchase ID provided is not valid.');
  }
}
