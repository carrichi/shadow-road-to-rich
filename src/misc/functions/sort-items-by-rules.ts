import { OrderByParams, SingleOrder } from '../types/order-by.type';

export function sortByField(rule: object, items: any[]): any[] {
  const { field, direction }: SingleOrder = {
    field: Object.keys(rule)[0],
    direction: Object.values(rule)[0],
  };

  console.log(`Trying to sort by: ${field} - ${direction}`);

  if (typeof items[0][field] === 'string') {
    console.log(`Initial by string...`);
    console.log(items.map((item) => item[field]));
    items.sort();
    console.log(`Sorted...`);
    console.log(items.map((item) => item[field]));
  }

  if (items[0][field] instanceof Date) {
    items.sort((a, b) =>
      direction === 'ASC'
        ? a[field].getTime() - b[field].getTime()
        : b[field].getTime() - a[field].getTime(),
    );
  }

  return items;
}

export function sortItemsByFields(rules: OrderByParams, items: any[]): any[] {
  if (!(rules instanceof Array)) {
    return sortByField(rules, items);
  }

  let sorted_items = [];
  for (const rule of rules) {
    sorted_items = sortByField(rule, items);
  }
  return sorted_items;
}
