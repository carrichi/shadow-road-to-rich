import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, DataSource, Equal, ILike, In, Repository } from 'typeorm';
import { Purchase } from './purchase.entity';
import { FindPurchasesDTO } from './dto/find.dto';
import { CreatePurchaseDTO } from './dto/create.dto';
import { UpdatePurchaseDTO } from './dto/update.dto';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private purchasesRepository: Repository<Purchase>,
    private dataSource: DataSource,
  ) {}

  async findAll({
    id,
    amount,
    concept,
    status,
    payment_method,
    skippeable,
    category,
    frecuency,
    applied_at,
    deadline,
    payed_at,
    notes,
  }: FindPurchasesDTO): Promise<Purchase[]> {
    const options = {};
    if (id) {
      options['id'] = !(id instanceof Array) ? Equal(id) : In(id);
    }
    if (amount) options['amount'] = Equal(amount);
    if (concept) options['concept'] = ILike(concept);
    if (status) options['status'] = In(status);
    if (payment_method) options['payment_method'] = In(payment_method);
    if (skippeable) options['skippeable'] = skippeable;
    if (category) options['category'] = In(category);
    if (frecuency) options['frecuency'] = In(frecuency);
    if (notes) options['notes'] = ILike(notes);
    if (applied_at)
      options['applied_at'] = Between(applied_at.start, applied_at.end);
    if (deadline) options['deadline'] = Between(deadline.start, deadline.end);
    if (payed_at) options['deadline'] = Between(payed_at.start, payed_at.end);

    const records_found = await this.purchasesRepository.findBy(options);
    console.log('Records found:');
    console.log(records_found);
    return records_found;
  }

  async findOne(id: string): Promise<Purchase | null> {
    return await this.purchasesRepository.findOneBy({ id });
  }

  async create({
    concept,
    amount,
    category,
    deadline,
    notes,
    payment_method,
    skippeable,
    status,
  }: CreatePurchaseDTO): Promise<Purchase> {
    const purchase = this.purchasesRepository.create({
      concept: concept,
      amount: amount,
      category: category,
      deadline: deadline,
      notes: notes,
      payment_method: payment_method,
      skippeable: skippeable,
      status: status,
    });
    console.log('Data as Purchase:');
    console.log(purchase);
    const result = await this.purchasesRepository.save(purchase, {
      reload: true,
    });
    console.log('Result:');
    console.log(result);
    // const purchase = await this.dataSource
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Purchase)
    //   .values([
    //     {
    //       concept: concept,
    //       amount: amount,
    //       category: category,
    //       deadline: deadline,
    //       notes: notes,
    //       payment_method: payment_method,
    //       skippeable: skippeable,
    //       status: status,
    //     },
    //   ])
    //   .execute();
    return result;
  }

  async update(id: string, data: UpdatePurchaseDTO): Promise<any> {
    console.log('id: ', id);
    const purchase = await this.findOne(id);
    const result = purchase
      ? await this.purchasesRepository.save({
          id: purchase.id,
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
