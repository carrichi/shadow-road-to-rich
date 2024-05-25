import { And, Between, LessThan, Or } from 'typeorm';

export type DateSearchParams = {
  // Query settings
  method?: 'AND' | 'OR';
  // Parameters
  between?: { start: Date; end: Date };
  before?: Date;
};

export function SearchDateBy({ method, between, before }: DateSearchParams) {
  const filters = [];
  if (before) filters.push(LessThan(before));
  if (between) filters.push(Between(between.start, between.end));
  return method !== 'OR' ? And(...filters) : Or(...filters);
}
