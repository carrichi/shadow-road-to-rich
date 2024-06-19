export function castDates(field: string, items: any[]): any[] {
  const casted_items = [];
  if (items.length == 0) return [];

  for (const item of items) {
    Object.keys(item).map((key) => {
      // If field is null, pass to next record.
      if (key === field && item[field] == null) casted_items.push(item);

      // If field is a string, cast field and go next.
      if (
        key === field &&
        typeof item[field] === 'string' &&
        (item[field] = new Date(item[field]))
      )
        casted_items.push(item);
    });
  }
  return casted_items;
}
