import { OrderByParams } from 'src/misc/types/order-by.type';

export type FindPaymentMethodsDTO = {
  method?: 'AND' | 'OR';
  fields?: {
    id?: string | string[];
    name?: string | string[];
    limit_payment_day?: number;
    cut_off_day?: number;
    credit?: boolean;
    active?: boolean;
    amount_limit?: number;
  };
  order_by?: OrderByParams;
};
