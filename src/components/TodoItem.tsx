import type { Todo } from '../types';

type TodoItemProps = {
    todo: Todo;
    toggleTodo: (id: string, completed: boolean) => void;
    deleteTodo: (id: string) => void;
};

export function TodoItem({ todo, toggleTodo, deleteTodo }: TodoItemProps) {
    return (
        <li key={todo.id}>
            <label htmlFor="item">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={e => toggleTodo(todo.id, e.target.checked)}
                />
                {todo.title} 
            </label>
            <small>added on ({new Date(todo.createdAt).toLocaleDateString()})</small>
            <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger">
                Delete
            </button>
        </li>
    )
};