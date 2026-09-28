import type { Todo } from '../types';

export function filterBy(items: Todo[], query: string, key: keyof Todo) {
  if (!query) return items;
  const filter = query.toLowerCase();
  return items.filter(item =>
    String(item[key]).toLowerCase().includes(filter)
  );
}