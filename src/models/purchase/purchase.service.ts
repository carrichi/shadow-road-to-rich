import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Equal, ILike, In, Repository } from 'typeorm';
import { Purchase } from './purchase.entity';
import { FindPurchasesDTO } from './dto/find.dto';
import { CreatePurchaseDTO } from './dto/create.dto';
import { UpdatePurchaseDTO } from './dto/update.dto';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private purchasesRepository: Repository<Purchase>,
  ) {}

  async findAll({ fields, order_by }: FindPurchasesDTO): Promise<Purchase[]> {
    const options = {};
    if (fields?.id) {
      options['id'] = !(fields.id instanceof Array)
        ? Equal(fields.id)
        : In(<string[]>fields.id);
    }
    if (fields?.amount) options['amount'] = Equal(fields.amount);
    if (fields?.concept) options['concept'] = ILike(fields.concept);
    if (fields?.status) options['status'] = In(fields.status);
    if (fields?.payment_method)
      options['payment_method'] = In(fields.payment_method);
    if (fields?.skippeable) options['skippeable'] = fields.skippeable;
    if (fields?.category) options['category'] = In(fields.category);
    if (fields?.frecuency) options['frecuency'] = In(fields.frecuency);
    if (fields?.notes) options['notes'] = ILike(fields.notes);
    if (fields?.applied_at)
      options['applied_at'] = Between(
        fields.applied_at.start,
        fields.applied_at.end,
      );
    if (fields?.deadline)
      options['deadline'] = Between(fields.deadline.start, fields.deadline.end);
    if (fields?.payed_at)
      options['deadline'] = Between(fields.payed_at.start, fields.payed_at.end);

    const records_found = await this.purchasesRepository.findBy(options);
    console.log('Records found:');
    console.log(records_found);
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

  async remove(id: string): Promise<void> {
    await this.purchasesRepository.delete(id);
  }
}
