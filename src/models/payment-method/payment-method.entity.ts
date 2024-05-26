import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Payment Methods')
export class PaymentMethod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'text' })
  name: string;
  @Column({ nullable: false, type: 'boolean' })
  credit: boolean;
  @Column({ nullable: false, type: 'int4' })
  limit_payment_day: number;
  @Column({ nullable: false, type: 'int4' })
  cut_off_day: number;
  @Column({ nullable: false, type: 'float8' })
  amount_limit: number;
  @Column({ nullable: false, default: true, type: 'boolean' })
  active: boolean;

  // TODO: Implement BANK STATEMENTS (for future)
  // @Column({ nullable: true, type: 'relation' })
  // bank_statements: number;

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
