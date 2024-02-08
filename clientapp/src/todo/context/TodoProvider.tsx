import { useReducer } from "react";
import { TodoState, Todo } from "../interfaces/interfaces";
import { TodoContext } from "./TodoContext";
import { TodoReducer } from "./TodoReducer";

const INITIAL_STATE: TodoState = {
  todoCount: 2,
  todos: [
    { id: "1", title: "Todo 1", completed: false },
    { id: "2", title: "Todo 2", completed: false },
  ],
  completed: 0,
  pending: 2,
};

interface props {
  children: JSX.Element | JSX.Element[];
}

export const TodoProvider = ({ children }: props) => {
  const [todoState, dispatch] = useReducer(TodoReducer, INITIAL_STATE);

  const toggleTodo = (id: string) => {
    dispatch({ type: "TOGGLE_TODO", payload: { id } });
  };

  return (
    <TodoContext.Provider value={{ todoState, toggleTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
