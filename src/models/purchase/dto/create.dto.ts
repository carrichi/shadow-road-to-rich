export type CreatePurchaseDTO = {
  concept: string;
  status: string;
  amount: number;
  payment_method: string;
  category?: string;
  frecuency?: string;
  skippeable?: boolean;
  notes?: string;
  applied_at?: Date;
  deadline?: Date;
  payed_at?: Date;
};
