import type { Todo } from '../types';

export function sortBy(items: Todo[], key: keyof Todo, direction = "asc") {
  const dir = direction === "asc" ? 1 : -1;

  return [...items].sort((a, b) => {
    const va = a[key];
    const vb = b[key];

    if (typeof va === "number" && typeof vb === "number") {
      return (va - vb) * dir;
    }

    return String(va).localeCompare(String(vb)) * dir;
  });
}