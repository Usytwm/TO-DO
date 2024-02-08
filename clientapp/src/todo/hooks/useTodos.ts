import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

export const useTodos = () => {
  const { todoState, toggleTodo, addTodo, removeTodo, updateTodo } =
    useContext(TodoContext);
  const { todos } = todoState;

  return {
    todos,
    todoCount: todos.length,
    pendingTodos: todos.filter((todo) => !todo.completed).length,
    completedTodos: todos.filter((todo) => todo.completed).length,
    toggleTodo,
    addTodo,
    removeTodo,
    updateTodo,
  };
};
