import { useEffect, useState } from 'react';
import { NewTodoForm } from './components/NewTodoForm';
import { TodoList } from './components/TodoList';
import type { Todo } from './types';
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    /* TypeScript infers the type from the function call. `localStorage.getItem` is declared to return `string | null`, 
     * because the key might not exist
     */
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];

    return JSON.parse(localValue);
    // const savedTodos = JSON.parse(localValue) as Array<
    //   Omit<Todo, 'createdAt'> & { createdAt: string }
    // >;
    // return savedTodos.map((todo) => ({
    //   ...todo,
    //   createdAt: new Date(todo.createdAt),
    // }));
  });

  console.log('Todos:', todos);

  useEffect(() => {
      localStorage.setItem("ITEMS", JSON.stringify(todos))
    }, [todos]);

  const addTodo = (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    console.log('Adding todo:', trimmed);

    setTodos((currentTodos) => [
      ...currentTodos,
      {
        id: crypto.randomUUID(),
        title: trimmed,
        completed: false,
        createdAt: new Date(),
      },
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <h1 className="header">Todo List</h1>
      <NewTodoForm onSubmit={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}

export default App;
