import { Todo, TodoState } from "../interfaces/interfaces";

type TodoAction =
  | { type: "ADD_TODO"; payload: Todo }
  | { type: "TOGGLE_TODO"; payload: { id: string } }
  | { type: "REMOVE_TODO"; payload: { id: string } }
  | { type: "UPDATE_TODO"; payload: { id: string; updatedTodo: Todo } }
  | { type: "SET_INITIAL_TODOS"; payload: Todo[] };

export const TodoReducer = (
  state: TodoState,
  action: TodoAction
): TodoState => {
  switch (action.type) {
    case "SET_INITIAL_TODOS":
      return {
        ...state,
        todos: action.payload,
        todoCount: action.payload.length,
        completed: action.payload.filter((todo) => todo.completed).length,
        pending: action.payload.filter((todo) => !todo.completed).length,
      };
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
        todoCount: state.todoCount + 1,
        pending: state.pending + 1,
      };
    case "TOGGLE_TODO":
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
      return {
        ...state,
        todos: updatedTodos,
        completed: updatedTodos.filter((todo) => todo.completed).length,
        pending: updatedTodos.filter((todo) => !todo.completed).length,
      };
    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
        todoCount: state.todoCount - 1,
        completed: state.completed - 1,
      };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload.updatedTodo : todo
        ),
      };
    default:
      return state;
  }
};
