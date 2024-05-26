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
  CITID = 'CITID',
  MPD = 'MPD',
  DINN = 'DINN',
  KLAR = 'KLAR',
  OTHER = 'OTHER',
}

@Entity('Settings')
export class Setting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'float4' })
  home_percentage: string;
  @Column({ nullable: false, type: 'float4' })
  savings_percentage: string;
  @Column({ nullable: false, type: 'float4' })
  investment_percentage: number;
  @Column({ nullable: false, type: 'float4' })
  travel_percentage: string;

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
