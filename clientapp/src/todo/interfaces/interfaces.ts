export interface Todo {
  id?: string;
  description: string;
  completed: boolean;
  creationDate?: Date;
  completionDate?: Date;
}

export interface TodoState {
  todoCount: number;
  todos: Todo[];
  completed: number;
  pending: number;
}
export interface searchProps {
  searchTerm: string;
}
