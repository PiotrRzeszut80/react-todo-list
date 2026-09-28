import { useState, type ChangeEvent, type SubmitEvent } from "react";

interface NewTodoFormProps {
  onSubmit: (title: string) => void;
}

export function NewTodoForm({ onSubmit }: NewTodoFormProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title === "") return;

    onSubmit(title);
    setTitle("");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input
          value={title}
          onChange={handleChange}
          type="text"
          id="item"
        />
      </div>
      <button type="submit" className="btn">Add</button>
    </form>
  );
}