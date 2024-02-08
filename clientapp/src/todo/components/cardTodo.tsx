import { useState } from "react";
import { Title } from "./Title";
import { TodoList } from "./TodoList";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Tabs,
  Tab,
  Button,
  Input,
} from "@nextui-org/react";
import { ActiveTodos } from "./ActiveTodos";
import { CompletedTodos } from "./CompletedTodos";
import { FaSearch, FaPlus } from "react-icons/fa";

export const CardTodo = () => {
  const [selected, setSelected] = useState("all");
  return (
    <div>
      <Card>
        <CardHeader className="flex gap-3">
          <div className="flex justify-between items-center w-full">
            <Button size="sm" variant="shadow" color="primary">
              <FaPlus />
              <p>Agregar</p>
            </Button>
            
              <Input
                classNames={{
                  base: "max-w-full sm:max-w-[10rem] h-10",
                  mainWrapper: "h-full",
                  input: "text-small",
                  inputWrapper:
                    "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                }}
                placeholder="Tarea a buscar..."
                size="sm"
                startContent={<FaSearch size={18} />}
                type="search"
              />
            
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="overflow-auto max-h-[300px]">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={(key) => setSelected(key.toString())}
          >
            <Tab key="all" title="Todas">
              <Card className="min-h-[300px]">
                <CardHeader>
                  <div className="flex flex-col">
                    <p className="text-md">Todas las Tareas</p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <TodoList />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="Active" title="Activas">
              <Card className="min-h-[300px]">
                <CardHeader>
                  <div className="flex flex-col">
                    <p className="text-md">Tareas Activas</p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <ActiveTodos />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="Completed" title="Completadas">
              <Card className="min-h-[300px]">
                <CardHeader>
                  <div className="flex flex-col">
                    <p className="text-md">Tareas Completadas</p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <CompletedTodos />
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </CardBody>
        <Divider />
        <CardFooter>
          <div className="flex justify-between items-center w-full">
            <Link
              isExternal
              showAnchorIcon
              href="https://github.com/Usytwm/TO-DO"
            >
              Codigo fuente en GitHub.
            </Link>
            <Title />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
