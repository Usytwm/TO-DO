import { createContext } from "react";
import { Todo, TodoState } from "../interfaces/interfaces";

export type TodoContextProps = {
  todoState: TodoState;
  toggleTodo: (id: string) => void;
  addTodo: (todo: Todo) => void;
  removeTodo: (id: string) => void;
  updateTodo: (id: string, updatedTodo: Todo) => void;
};
export const TodoContext = createContext<TodoContextProps>(
  {} as TodoContextProps
);
