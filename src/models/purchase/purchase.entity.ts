import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum PurchaseCategories {
  TRAVEL = 'TRAVEL',
  HOME = 'HOME',
  PERSONAL = 'PERSONAL',
  EMERGENCY = 'EMERGENCY',
  FEES = 'FEES',
  OTHER = 'OTHER',
}

export enum PurchaseStatus {
  OFF_TRACK = 'OFF_TRACK',
  TO_PAY = 'TO_PAY',
  UP_NEXT = 'UP_NEXT',
  PAYED = 'PAYED',
  DEBT = 'DEBT',
}

export enum PurchaseMethods {
  CASH = 'CASH',
  NUC = 'NUC',
  VEXI = 'VEXI',
  MPC = 'MPC',
  BBC = 'BBC',
  BBD = 'BBD',
  NUD = 'NUD',
  CTD = 'CTD',
  MPD = 'MPD',
  DINN = 'DINN',
  KLAR = 'KLAR',
}

@Entity('Purchases')
export class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'text' })
  concept: string;
  @Column({ nullable: false, type: 'enum', enum: PurchaseStatus })
  status: string;
  @Column({ nullable: false, type: 'float8' })
  amount: number;
  @Column({ nullable: false, type: 'enum', enum: PurchaseMethods })
  payment_method: string;
  @Column({ nullable: false, type: 'date' })
  applied_at: Date;
  @Column({ nullable: false, type: 'date' })
  deadline: Date;
  @Column({ nullable: true, type: 'date' })
  payed_at: Date;
  @Column({ nullable: false, type: 'enum', enum: PurchaseCategories })
  category: string;
  @Column({ default: false, type: 'boolean' })
  skippeable: boolean;
  @Column({ nullable: true, type: 'text' })
  notes: string;

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
