import { useTodos } from "../hooks/useTodos";

export const Title = () => {
  const { pendingTodos } = useTodos();
  return <div>Tareas : {pendingTodos}</div>;
};
