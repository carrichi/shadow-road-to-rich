import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, InsertResult, Repository } from 'typeorm';
import { Purchase } from './purchase.entity';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private purchasesRepository: Repository<Purchase>,
    private dataSource: DataSource,
  ) {}

  async findAll(): Promise<Purchase[]> {
    const records_found = await this.purchasesRepository.find();
    console.log(records_found);
    return records_found;
  }

  findOne(id: string): Promise<Purchase | null> {
    return this.purchasesRepository.findOneBy({ id });
  }

  async create(data): Promise<InsertResult> {
    const purchase = await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(Purchase)
      .values([
        {
          concept: 'Testing jeje',
          amount: null,
          category: null,
          deadline: null,
          notes: null,
          payment_method: null,
          skippeable: true,
          status: null,
        },
      ])
      .execute();
    console.log('Created purchase: ', purchase);
    return purchase;
  }

  async remove(id: string): Promise<void> {
    await this.purchasesRepository.delete(id);
  }
}
