import { filterBy } from '../src/utilities/FilterBy';
import { sortBy } from '../src/utilities/SortBy';
import type { Todo } from '../src/types';

const todos: Todo[] = [
  {
    id: '2',
    title: 'Write tests',
    completed: false,
    createdAt: new Date('2024-01-02T00:00:00.000Z'),
  },
  {
    id: '1',
    title: 'Buy milk',
    completed: true,
    createdAt: new Date('2024-01-01T00:00:00.000Z'),
  },
  {
    id: '3',
    title: 'Plan sprint',
    completed: false,
    createdAt: new Date('2024-01-03T00:00:00.000Z'),
  },
];

describe('todo utilities', () => {
  it('filters items by a query in the selected field', () => {
    expect(filterBy(todos, 'milk', 'title')).toEqual([todos[1]]);
    expect(filterBy(todos, 'TEST', 'title')).toEqual([todos[0]]);
  });

  it('sorts items by title in ascending and descending order', () => {
    expect(sortBy(todos, 'title', 'asc').map((todo) => todo.title)).toEqual([
      'Buy milk',
      'Plan sprint',
      'Write tests',
    ]);

    expect(sortBy(todos, 'title', 'desc').map((todo) => todo.title)).toEqual([
      'Write tests',
      'Plan sprint',
      'Buy milk',
    ]);
  });
});
