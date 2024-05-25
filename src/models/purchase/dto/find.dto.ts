import { DateSearchParams } from 'src/misc/types/date-search.type';
import { OrderByParams } from 'src/misc/types/order-by.type';

export type FindPurchasesDTO = {
  method?: 'AND' | 'OR';
  fields?: {
    id?: string | string[];
    concept?: string;
    status?: string | string[];
    amount?: number;
    payment_method?: string[];
    category?: string[];
    frecuency?: string[];
    skippeable?: boolean;
    notes?: string;
    applied_at?: Date | DateSearchParams;
    deadline?: Date | DateSearchParams;
    payed_at?: Date | DateSearchParams;
  };
  order_by?: OrderByParams;
};
