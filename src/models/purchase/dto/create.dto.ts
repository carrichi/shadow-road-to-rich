// TODO: Verify fields by enums
import {
  PurchaseMethods,
  PurchaseStatus,
  PurchaseCategories,
} from '../purchase.entity';

export type CreatePurchaseDTO = {
  concept: string;
  status: string;
  amount: number;
  payment_method: string;
  category: string;
  applied_at: Date;
  deadline: Date;
  payed_at?: Date;
  frecuency?: string;
  skippeable?: boolean;
  notes?: string;
};
