import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './purchase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase])],
  exports: [TypeOrmModule],
})
export class PurchaseModule {}
