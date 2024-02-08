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
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { ActiveTodos } from "./ActiveTodos";
import { CompletedTodos } from "./CompletedTodos";
import { FaSearch, FaPlus } from "react-icons/fa";
import { useTodos } from "../hooks/useTodos";

export const CardTodo = () => {
  const { addTodo } = useTodos();
  const [selected, setSelected] = useState("all");

  const [taskDescription, setTaskDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  // Manejador para actualizar searchTerm
  const handleSearchChange = (e: { target: { value: string } }) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  const handleAddTask = () => {
    addTodo({
      description: taskDescription,
      completed: false,
      // creationDate: new Date(),
    });

    console.log("Nueva tarea agregada:", taskDescription);

    // Limpiar el campo de entrada después de agregar la tarea
    setTaskDescription("");

    // Cerrar el modal después de agregar la tarea
    onClose();
  };

  return (
    <div>
      <Card>
        <CardHeader className="flex gap-3">
          <div className="flex justify-between items-center w-full">
            <Button onPress={onOpen} size="sm" variant="shadow" color="primary">
              <FaPlus />
              <p>Agregar</p>
            </Button>
            <Modal size={"sm"} isOpen={isOpen} onClose={onClose}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader>Agregar Tarea</ModalHeader>
                    <ModalBody>
                      <label htmlFor="taskDescription">
                        Descripción de la Tarea:
                      </label>
                      <Input
                        id="taskDescription"
                        placeholder="Ingresa la descripción de la tarea"
                        onChange={(e) => setTaskDescription(e.target.value)}
                        // ... otras propiedades necesarias para tu Input ...
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onPress={handleAddTask}>
                        Aceptar
                      </Button>
                      <Button onPress={onClose}>Cancelar</Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
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
              onChange={handleSearchChange}
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
              <Card className="min-w-[600px] min-h-[200px]">
                <CardHeader>
                  <div className="flex flex-col">
                    <p className="text-md">Todas las Tareas</p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <TodoList searchTerm={searchTerm} />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="Active" title="Activas">
              <Card className="min-w-[600px] min-h-[200px]">
                <CardHeader>
                  <div className="flex flex-col">
                    <p className="text-md">Tareas Activas</p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <ActiveTodos searchTerm={searchTerm} />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="Completed" title="Completadas">
              <Card className="min-w-[600px] min-h-[200px]">
                <CardHeader>
                  <div className="flex flex-col">
                    <p className="text-md">Tareas Completadas</p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <CompletedTodos searchTerm={searchTerm} />
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
