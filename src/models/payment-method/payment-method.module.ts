import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethodService } from './payment-method.service';
import { PaymentMethod } from './payment-method.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentMethod])],
  providers: [PaymentMethodService],
  exports: [TypeOrmModule, PaymentMethodService],
})
export class PaymentMethodModule {}
