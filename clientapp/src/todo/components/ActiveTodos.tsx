import React from "react";
import { useTodos } from "../hooks/useTodos";
import { TodoItem } from "./TodoItem";
import { Todo, searchProps } from "../interfaces/interfaces";

export const ActiveTodos = ({ searchTerm }: searchProps) => {
  const { todos } = useTodos();
  // Filtrar las tareas basadas en searchTerm
  const filteredTodos = todos.filter((todo) =>
    todo.description.toLowerCase().includes(searchTerm)
  );

  const getStatusColor = (isCompleted: boolean) => {
    return isCompleted ? "success" : "warning";
  };
  const sortByCreationDate = (a: Todo, b: Todo) => {
    // Asignar una fecha por defecto si creationDate es undefined
    const dateA = a.creationDate ? new Date(a.creationDate).getTime() : 0; // Fecha muy antigua
    const dateB = b.creationDate ? new Date(b.creationDate).getTime() : 0; // Fecha muy antigua
    return dateB - dateA;
  };

  filteredTodos.sort(sortByCreationDate);

  return (
    <ul>
      {filteredTodos
        .filter((todo) => !todo.completed)
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
