export type UpdatePaymentMethodDTO = {
  name?: string;
  credit?: boolean;
  limit_payment_day?: number;
  cut_off_day?: number;
  amount_limit?: number;
  active?: boolean;
};
