import { useTodos } from "../hooks/useTodos";

export const Title = () => {
  const { todoCount } = useTodos();
  return <div>Tareas : {todoCount}</div>;
};
