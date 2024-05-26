import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { PaymentMethod } from './payment-method.entity';
import { FindPaymentMethodsDTO } from './dto/find.dto';
import { validateUUID } from 'src/misc/dto/uuid.dto';
import { CreatePaymentMethodDTO } from './dto/create.dto';
import { UpdatePaymentMethodDTO } from './dto/update.dto';

@Controller('payment-methods')
export class PaymentMethodController {
  constructor(private readonly service: PaymentMethodService) {}
  @Get()
  async findAll(
    @Body() params: FindPaymentMethodsDTO,
  ): Promise<PaymentMethod[]> {
    return await this.service.findAll(params);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<PaymentMethod | BadRequestException> {
    return validateUUID(id)
      ? await this.service.findOne(id)
      : new BadRequestException('PaymentMethod ID provided is not valid.');
  }

  @Post()
  async create(
    @Body() data: CreatePaymentMethodDTO,
  ): Promise<PaymentMethod | BadRequestException> {
    const result = await this.service.create(data);
    return result
      ? result
      : new BadRequestException('Creation of PaymentMethod failed.');
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdatePaymentMethodDTO,
  ): Promise<PaymentMethod> {
    return validateUUID(id)
      ? await this.service.update(id, data)
      : new BadRequestException('PaymentMethod ID provided is not valid.');
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return validateUUID(id)
      ? await this.service.delete(id)
      : new BadRequestException('PaymentMethod ID provided is not valid.');
  }
}
