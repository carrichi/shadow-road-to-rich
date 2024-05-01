import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Purchases')
export class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: true })
  concept: string;
  @Column({ nullable: true })
  status: string;
  @Column({ nullable: true })
  amount: number;
  @Column({ nullable: true })
  payment_method: string;
  @Column({ nullable: true })
  deadline: Date;
  @Column({ nullable: true })
  category: string;
  @Column({ default: true })
  skippeable: boolean;
  @Column({ nullable: true })
  notes: string;

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
