import { Todo, TodoState } from "../interfaces/interfaces";

type TodoAction =
  | { type: "ADD_TODO"; payload: Todo }
  | { type: "TOGGLE_TODO"; payload: { id: string } }
  | { type: "REMOVE_TODO"; payload: { id: string } };

export const TodoReducer = (
  state: TodoState,
  action: TodoAction
): TodoState => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
        todoCount: state.todoCount + 1,
        pending: state.pending + 1,
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
        completed: state.completed + 1,
        pending: state.pending - 1,
      };
    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
        todoCount: state.todoCount - 1,
        completed: state.completed - 1,
      };
    default:
      return state;
  }
};
