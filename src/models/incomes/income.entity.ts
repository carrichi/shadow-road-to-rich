import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Incomes')
export class Income {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ nullable: true })
  description: string;
  @Column('float8', { nullable: true })
  amount: number;
  @Column({ nullable: true })
  recieved_at: Date;
  @Column({ nullable: true })
  details: string;

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
