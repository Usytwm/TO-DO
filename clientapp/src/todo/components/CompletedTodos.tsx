import React from "react";
import { useTodos } from "../hooks/useTodos";
import { TodoItem } from "./TodoItem";
import { Todo, searchProps } from "../interfaces/interfaces";

export const CompletedTodos = ({ searchTerm }: searchProps) => {
  const { todos } = useTodos();
  const getStatusColor = (isCompleted: boolean) => {
    return isCompleted ? "success" : "warning";
  };
  // Filtrar las tareas basadas en searchTerm
  const filteredTodos = todos.filter((todo) =>
    todo.description.toLowerCase().includes(searchTerm)
  );
  const sortByCompleteDate = (a: Todo, b: Todo) => {
    // Asignar una fecha por defecto si creationDate es undefined
    const dateA = a.completionDate ? new Date(a.completionDate).getTime() : 0; // Fecha muy antigua
    const dateB = b.completionDate ? new Date(b.completionDate).getTime() : 0; // Fecha muy antigua

    return dateB - dateA;
  };
  filteredTodos.sort(sortByCompleteDate);
  return (
    <ul>
      {filteredTodos
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
