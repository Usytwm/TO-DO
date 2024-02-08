import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { TodoItem } from "./TodoItem";
import { useTodos } from "../hooks/useTodos";

export const TodoList = () => {
  const { todos } = useTodos();
  const getStatusColor = (isCompleted: boolean) => {
    return isCompleted ? "success" : "warning"; // Ejemplo: verde para completadas, amarillo para pendientes
  };
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          statusColor={getStatusColor(todo.completed)}
        />
      ))}
    </ul>
  );
};
