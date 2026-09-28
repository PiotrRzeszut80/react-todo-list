import { useState, useMemo } from "react";
import { TodoItem } from "./TodoItem";
import { filterBy } from "../utilities/FilterBy";
import { sortBy } from "../utilities/SortBy";
import type { Todo } from '../types';

type TodoListProps = {
    todos: Todo[];
    toggleTodo: (id: string, completed: boolean) => void;
    deleteTodo: (id: string) => void;
};

export function TodoList({ todos, toggleTodo, deleteTodo }: TodoListProps) {
    const [filter, setFilter] = useState<string>("");
    const [sortKey, setSortKey] = useState<keyof Todo>("id");
    const [direction, setDirection] = useState<"asc" | "desc">("asc");

    const filteredTodos = useMemo(() => {
        return filterBy(todos, filter, "title");
    }, [todos, filter]);

    const sortedTodos = useMemo(() => {
        return sortBy(filteredTodos, sortKey, direction);
    }, [filteredTodos, sortKey, direction]);

    function toggleSort(key: keyof Todo) {
    if (key === sortKey) {
      setDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setDirection("asc");
    }
  }

    return (
        <section className="list">
            <input
                placeholder="filter..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
            <button onClick={() => toggleSort("title")}>Sort by Title</button>
            <button onClick={() => toggleSort("createdAt")}>Sort by Created At</button>
            <ul>
                {sortedTodos.length === 0 && "No todos yet."}
                {sortedTodos.map(todo => {
                    return (
                        <TodoItem 
                            todo={todo}
                            key={todo.id}
                            toggleTodo={toggleTodo}
                            deleteTodo={deleteTodo}
                        />
                    );
                })}
            </ul>
        </section>
    );
};