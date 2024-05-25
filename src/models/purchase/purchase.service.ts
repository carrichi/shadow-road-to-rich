import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  Equal,
  FindOperator,
  ILike,
  In,
  LessThan,
  Repository,
} from 'typeorm';
import { Purchase } from './purchase.entity';
import { FindPurchasesDTO } from './dto/find.dto';
import { CreatePurchaseDTO } from './dto/create.dto';
import { UpdatePurchaseDTO } from './dto/update.dto';
import { SearchDateBy } from 'src/misc/types/date-search.type';
import transcriptRules from 'src/misc/functions/transcript-rules';
import transcriptOrders from 'src/misc/functions/transcript-orders';
import { sortItemsByFields } from 'src/misc/functions/sort-items-by-rules';
import { OrderByParams } from 'src/misc/types/order-by.type';
import { castDates } from 'src/misc/functions/cast-types';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private purchasesRepository: Repository<Purchase>,
  ) {}

  // TODO: Add pagination...
  async findAll({
    fields,
    order_by,
    method,
  }: FindPurchasesDTO): Promise<Purchase[]> {
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
    if (fields?.amount) options.rules['amount'] = Equal(fields.amount);
    if (fields?.concept) options.rules['concept'] = ILike(fields.concept);
    if (fields?.status) {
      options.rules['status'] = !(fields.status instanceof Array)
        ? Equal(fields.status as string)
        : In(fields.status as string[]);
    }
    if (fields?.payment_method)
      options.rules['payment_method'] = In(fields.payment_method);
    if (fields?.skippeable) options.rules['skippeable'] = fields.skippeable;
    if (fields?.category) options.rules['category'] = In(fields.category);
    if (fields?.frecuency) options.rules['frecuency'] = In(fields.frecuency);
    if (fields?.notes) options.rules['notes'] = ILike(fields.notes);
    if (fields?.applied_at) {
      options.rules['applied_at'] =
        fields.applied_at instanceof Date
          ? Equal(fields.applied_at)
          : Between(
              fields.applied_at.between.start,
              fields.applied_at.between.end,
            );
    }
    if (fields?.deadline) {
      const filters: FindOperator<any>[] = [];
      const deadline = fields.deadline;
      if (deadline instanceof Date) {
        options.rules['deadline'] = Equal(deadline);
      } else {
        if (deadline?.before) filters.push(LessThan(deadline.before));
        if (deadline?.between)
          filters.push(Between(deadline.between.start, deadline.between.end));
        options.rules['deadline'] = SearchDateBy(deadline);
      }
    }
    if (fields?.payed_at) {
      options.rules['payed_at'] =
        fields.payed_at instanceof Date
          ? Equal(fields.payed_at)
          : Between(fields.payed_at.between.start, fields.payed_at.between.end);
    }

    options['where'] = transcriptRules(method, options['rules']);

    let records_found = await this.purchasesRepository.findBy(options.where);
    if (!records_found) return [];

    // Order records, if needed...
    options['order'] = order_by ? transcriptOrders(order_by) : null;
    console.log('Orders:');
    console.log(options['order']);

    let sorted_records = records_found;
    sorted_records = castDates('deadline', sorted_records);

    // console.log('Records to sort:');
    // console.log(sorted_records);
    records_found =
      options['order'] != null
        ? sortItemsByFields(options['order'] as OrderByParams, sorted_records)
        : records_found;

    // console.log('Final result:');
    // console.log(
    //   records_found.map((rec) => ({
    //     status: rec.status,
    //     amount: rec.amount,
    //     deadline: rec.deadline,
    //   })),
    // );
    return records_found;
  }

  async findOne(id: string): Promise<Purchase | null> {
    return await this.purchasesRepository.findOneBy({ id });
  }

  async create(data: CreatePurchaseDTO): Promise<Purchase | undefined> {
    console.log('Recived data...');
    console.log(data);
    const purchase = this.purchasesRepository.create({
      concept: data.concept,
      status: data.status,
      payment_method: data.payment_method,
      amount: data.amount,
      category: data.category,
      applied_at: data.applied_at,
      deadline: data.deadline,
    });
    console.log('Data as Purchase:');
    console.log(purchase);
    try {
      const result = await this.purchasesRepository.save(purchase, {
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

  async update(id: string, data: UpdatePurchaseDTO): Promise<any> {
    console.log('id: ', id);
    const purchase = await this.findOne(id);
    const result = purchase
      ? await this.purchasesRepository.save({
          ...purchase,
          ...data,
        })
      : null;
    console.log('Result:');
    console.log(result);
    return result;
  }

  async softDelete(id: string): Promise<any> {
    const purchase = await this.findOne(id);
    const result = purchase
      ? await this.purchasesRepository.save({
          ...purchase,
          deleted_at: new Date(),
        })
      : null;
    return result;
  }

  async delete(id: string): Promise<void> {
    await this.purchasesRepository.delete(id);
  }
}
