import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, In, Repository } from 'typeorm';
import { PaymentMethod } from './payment-method.entity';
import { FindPaymentMethodsDTO } from './dto/find.dto';
import { CreatePaymentMethodDTO } from './dto/create.dto';
import { UpdatePaymentMethodDTO } from './dto/update.dto';
import transcriptRules from 'src/misc/functions/transcript-rules';
import transcriptOrders from 'src/misc/functions/transcript-orders';
import { sortItemsByFields } from 'src/misc/functions/sort-items-by-rules';
import { OrderByParams } from 'src/misc/types/order-by.type';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectRepository(PaymentMethod)
    private PaymentMethodsRepository: Repository<PaymentMethod>,
  ) {}

  // TODO: Add pagination...
  async findAll({
    fields,
    order_by,
    method,
  }: FindPaymentMethodsDTO): Promise<PaymentMethod[]> {
    const options: {
      rules: object;
      where: object | [];
      order: object | null;
    } = { rules: {}, where: {}, order: null };

    if (fields?.id) {
      options.rules['id'] = !(fields.id instanceof Array)
        ? Equal(fields.id)
        : In(fields.id as string[]);
    }
    if (fields?.amount_limit)
      options.rules['amount'] = Equal(fields.amount_limit);
    if (fields?.credit) options.rules['credit'] = Equal(fields.credit);
    if (fields?.active) options.rules['active'] = Equal(fields.active);
    if (fields?.limit_payment_day)
      options.rules['limit_payment_day'] = Equal(fields.limit_payment_day);
    if (fields?.cut_off_day)
      options.rules['cut_off_day'] = Equal(fields.cut_off_day);
    if (fields?.name) {
      options.rules['name'] = !(fields.name instanceof Array)
        ? Equal(fields.name)
        : In(fields.name as string[]);
    }

    options['where'] = transcriptRules(method, options['rules']);

    const records_found = await this.PaymentMethodsRepository.findBy(
      options.where,
    );
    if (records_found.length == 0) return [];

    // Order records, if needed...
    if (!order_by) return records_found;

    options['order'] = transcriptOrders(order_by);
    console.log('Orders:');
    console.log(options['order']);

    let sorted_records = records_found;
    sorted_records = sortItemsByFields(
      options['order'] as OrderByParams,
      sorted_records,
    );
    return sorted_records;
  }

  async findOne(id: string): Promise<PaymentMethod | null> {
    return await this.PaymentMethodsRepository.findOneBy({ id });
  }

  async create(
    data: CreatePaymentMethodDTO,
  ): Promise<PaymentMethod | undefined> {
    console.log('Recived data...');
    console.log(data);
    const PaymentMethod = this.PaymentMethodsRepository.create({
      name: data.name,
      credit: data.credit,
      limit_payment_day: data.limit_payment_day,
      cut_off_day: data.cut_off_day,
      amount_limit: data.amount_limit,
      active: data.active,
    });
    console.log('Data as PaymentMethod:');
    console.log(PaymentMethod);
    try {
      const result = await this.PaymentMethodsRepository.save(PaymentMethod, {
        reload: true,
      });
      console.log('Result:');
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async update(id: string, data: UpdatePaymentMethodDTO): Promise<any> {
    console.log('id: ', id);
    const PaymentMethod = await this.findOne(id);
    const result = PaymentMethod
      ? await this.PaymentMethodsRepository.save({
          ...PaymentMethod,
          ...data,
        })
      : null;
    console.log('Result:');
    console.log(result);
    return result;
  }

  async delete(id: string): Promise<void> {
    await this.PaymentMethodsRepository.delete(id);
  }
}
