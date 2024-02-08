import { Title } from "./components/Title";
import { CardTodo } from "./components/cardTodo";
import { TodoProvider } from "./context/TodoProvider";

export const Todo = () => {
  return (
    <>
      <TodoProvider>
        <CardTodo />
      </TodoProvider>
    </>
  );
};
