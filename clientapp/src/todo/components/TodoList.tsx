import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { TodoItem } from "./TodoItem";
import { useTodos } from "../hooks/useTodos";
import { Todo, searchProps } from "../interfaces/interfaces";

export const TodoList = ({ searchTerm }: searchProps) => {
  const { todos } = useTodos();
  const filteredTodos = todos.filter((todo) =>
    todo.description.toLowerCase().includes(searchTerm)
  );

  const completedTodos = filteredTodos.filter((todo) => todo.completed);
  const activeTodos = filteredTodos.filter((todo) => !todo.completed);

  // Ordenar ambas listas por fecha de creación
  const sortByCreationDate = (a: Todo, b: Todo) => {
    // Asignar una fecha por defecto si creationDate es undefined
    const dateA = a.creationDate ? new Date(a.creationDate).getTime() : 0; // Fecha muy antigua
    const dateB = b.creationDate ? new Date(b.creationDate).getTime() : 0; // Fecha muy antigua

    return dateB - dateA;
  };
  const sortByCompleteDate = (a: Todo, b: Todo) => {
    // Asignar una fecha por defecto si creationDate es undefined
    const dateA = a.completionDate ? new Date(a.completionDate).getTime() : 0; // Fecha muy antigua
    const dateB = b.completionDate ? new Date(b.completionDate).getTime() : 0; // Fecha muy antigua

    return dateB - dateA;
  };
  completedTodos.sort(sortByCompleteDate);
  activeTodos.sort(sortByCreationDate);

  // Combinar las listas, primero las activas y luego las completadas
  const sortedTodos = [...activeTodos, ...completedTodos];
  const getStatusColor = (isCompleted: boolean) => {
    return isCompleted ? "success" : "warning"; // Ejemplo: verde para completadas, amarillo para pendientes
  };
  return (
    <ul>
      {sortedTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          statusColor={getStatusColor(todo.completed)}
        />
      ))}
    </ul>
  );
};
