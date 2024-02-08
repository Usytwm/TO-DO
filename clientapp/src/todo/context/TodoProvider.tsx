// import { useReducer } from "react";
// import { TodoState, Todo } from "../interfaces/interfaces";
// import { TodoContext } from "./TodoContext";
// import { TodoReducer } from "./TodoReducer";

// const INITIAL_STATE: TodoState = {
//   todoCount: 2,
//   todos: [
//     { id: "1", title: "Todo 1", completed: false },
//     { id: "2", title: "Todo 2", completed: false },
//   ],
//   completed: 0,
//   pending: 2,
// };

// interface props {
//   children: JSX.Element | JSX.Element[];
// }

// export const TodoProvider = ({ children }: props) => {
//   const [todoState, dispatch] = useReducer(TodoReducer, INITIAL_STATE);

//   const toggleTodo = (id: string) => {
//     dispatch({ type: "TOGGLE_TODO", payload: { id } });
//   };

//   return (
//     <TodoContext.Provider value={{ todoState, toggleTodo }}>
//       {children}
//     </TodoContext.Provider>
//   );
// };

import React, { createContext, useReducer, useEffect } from "react";
import { Todo, TodoState } from "../interfaces/interfaces";
import { TaskService } from "../Services/TaskService"; // Importa el servicio API
import { TodoReducer } from "./TodoReducer";
import { TodoContext } from "./TodoContext";

interface props {
  children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: TodoState = {
  todoCount: 0,
  todos: [],
  completed: 0,
  pending: 0,
};
export const TodoProvider = ({ children }: props) => {
  const [todoState, dispatch] = useReducer(TodoReducer, INITIAL_STATE);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todos = await TaskService.getAllTasks();
        dispatch({ type: "SET_INITIAL_TODOS", payload: todos });
      } catch (error) {
        console.error("Error al cargar los todos:", error);
      }
    };

    loadTodos();
  }, []);

  const addTodo = async (todo: Todo) => {
    try {
      const newTodo = await TaskService.createTask(todo);
      dispatch({ type: "ADD_TODO", payload: newTodo });
    } catch (error) {
      console.error("Error al añadir el todo:", error);
    }
  };

  const removeTodo = async (id: string) => {
    try {
      await TaskService.deleteTask(id);
      dispatch({ type: "REMOVE_TODO", payload: { id } });
    } catch (error) {
      console.error("Error al eliminar el todo:", error);
    }
  };

  const updateTodo = async (id: string, updatedTodo: Todo) => {
    try {
      await TaskService.updateTask(id, updatedTodo);
      dispatch({ type: "UPDATE_TODO", payload: { id, updatedTodo } });
    } catch (error) {
      console.error("Error al actualizar el todo:", error);
    }
  };

  const toggleTodo = (id: string) => {
    dispatch({ type: "TOGGLE_TODO", payload: { id } });
  };

  // Aquí puedes añadir más funciones según sea necesario

  return (
    <TodoContext.Provider
      value={{ todoState, toggleTodo, addTodo, removeTodo, updateTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};
