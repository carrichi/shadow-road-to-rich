import { OrderByParams } from '../types/order-by.type';

/**
 * Transcript order rules to an {} with rules as properties.
 * @param params {} | [] with rules
 * @returns {} with rules as properties
 */
export default function transcriptOrders(params: OrderByParams): object {
  if (!(params instanceof Array)) return { [params.field]: params.direction };
  else {
    const rules = {};
    params.map((rule) => {
      rules[rule.field] = rule.direction;
    });
    return rules;
  }
}
