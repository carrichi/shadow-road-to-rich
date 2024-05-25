export function castDates(field: string, items: any[]): any[] {
  const casted_items = [];
  for (const item of items) {
    Object.keys(item).map((key) => {
      if (
        typeof item[key] === 'string' &&
        key === field &&
        (item[field] = new Date(item[field]))
      )
        casted_items.push(item);
    });
  }
  return casted_items;
}
