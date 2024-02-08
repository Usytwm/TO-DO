import React from "react";
import { useTodos } from "../hooks/useTodos";
import { TodoItem } from "./TodoItem";

export const CompletedTodos = () => {
  const { todos } = useTodos();
  const getStatusColor = (isCompleted: boolean) => {
    return isCompleted ? "success" : "warning";
  };

  return (
    <ul>
      {todos
        .filter((todo) => todo.completed)
        .map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            statusColor={getStatusColor(todo.completed)}
          />
        ))}
    </ul>
  );
};
