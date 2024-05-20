export type FindPurchasesDTO = {
  id?: string | string[];
  concept?: string;
  status?: string[];
  amount?: number;
  payment_method?: string[];
  category?: string[];
  frecuency?: string[];
  skippeable?: boolean;
  notes?: string;
  applied_at?: { start: Date; end: Date };
  deadline?: { start: Date; end: Date };
  payed_at?: { start: Date; end: Date };
};
