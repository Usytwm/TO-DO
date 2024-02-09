import React, { useState, useContext } from "react";
import { Todo } from "../interfaces/interfaces";

import { Checkbox, Link, Chip, cn, Modal, Tooltip } from "@nextui-org/react";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
} from "@nextui-org/react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importar iconos
import { useTodos } from "../hooks/useTodos";

interface props {
  todo: Todo;
  statusColor:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
}

export const TodoItem = ({ todo, statusColor }: props) => {
  const { toggleTodo, removeTodo, updateTodo } = useTodos();
  const [editedDescription, setEditedDescription] = useState(todo.description);
  const deleteModal = useDisclosure();
  const editModal = useDisclosure();

  const [size, setSize] = React.useState<
    "sm" | "md" | "lg" | "xl" | "2xl" | "xs" | "3xl" | "4xl" | "5xl" | "full"
  >("md");

  const handleDeleteOpen = (
    size:
      | "sm"
      | "md"
      | "lg"
      | "xl"
      | "2xl"
      | "xs"
      | "3xl"
      | "4xl"
      | "5xl"
      | "full" = "sm"
  ) => {
    setSize(size);
    deleteModal.onOpen();
  };
  const handleEditOpen = (
    size:
      | "sm"
      | "md"
      | "lg"
      | "xl"
      | "2xl"
      | "xs"
      | "3xl"
      | "4xl"
      | "5xl"
      | "full" = "sm"
  ) => {
    setSize(size);
    editModal.onOpen();
  };

  const handleToggle = () => {
    updateTodo(todo.id!, {
      ...todo,
      completed: !todo.completed,
      completionDate: !todo.completed ? new Date() : undefined,
    });
    toggleTodo(todo.id!);
  };

  const handleDeleteConfirm = () => {
    removeTodo(todo.id!);
    deleteModal.onClose();
  };

  const handleEditConfirm = () => {
    updateTodo(todo.id!, { ...todo, description: editedDescription });
    editModal.onClose();
  };

  return (
    <div
      className="flex flex-col max-w-md w-full bg-content1 m-0 hover:bg-content2 justify-start cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent data-[selected=true]:border-primary"
      style={{ opacity: todo.completed ? 0.5 : 1 }}
    >
      <Tooltip
        content={
          !todo.completed
            ? `Creación: ${
                todo.creationDate
                  ? `${new Date(
                      todo.creationDate
                    ).toLocaleDateString()} ${new Date(
                      todo.creationDate
                    ).toLocaleTimeString()}`
                  : "No disponible"
              }`
            : `Completada: ${
                todo.completionDate
                  ? `${new Date(
                      todo.completionDate
                    ).toLocaleDateString()} ${new Date(
                      todo.completionDate
                    ).toLocaleTimeString()}`
                  : "No disponible"
              }`
        }
      >
        <div className="flex justify-between items-center w-full flex-wrap">
          <Checkbox
            aria-label={todo.description}
            checked={todo.completed}
            isDisabled={todo.completed}
            value={todo.id}
            onChange={() => {
              if (!todo.completed) {
                handleToggle(); // Cambiar estado solo si no está completada
              }
            }}
            className="flex-grow"
          >
            <div className="flex justify-between items-center gap-2 w-full">
              <div className="flex items-center gap-2 overflow-hidden">
                <span>{todo.description}</span>
              </div>

              <div className="flex items-center gap-1 flex-shrink">
                <Chip color={statusColor} size="sm" variant="flat">
                  {todo.completed ? "Completada" : "Pendiente"}
                </Chip>
              </div>
            </div>
          </Checkbox>
          <div className="flex gap-1">
            {!todo.completed && (
              <Button onPress={() => handleEditOpen("sm")}>
                <FaEdit />
              </Button>
            )}
            <Button onClick={() => handleDeleteOpen("sm")}>
              <FaTrash />
            </Button>
          </div>
        </div>
      </Tooltip>

      {/* Modal de confirmación de eliminación */}
      <Modal
        size={size}
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Confirmar eliminación</ModalHeader>
              <ModalBody>
                ¿Estás seguro de que deseas eliminar esta tarea?
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={handleDeleteConfirm}>
                  Eliminar
                </Button>
                <Button onPress={deleteModal.onClose}>Cancelar</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Modal de edición */}
      <Modal size={size} isOpen={editModal.isOpen} onClose={editModal.onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Editar tarea</ModalHeader>
              <ModalBody>
                <Input
                  fullWidth
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={handleEditConfirm}>
                  Guardar cambios
                </Button>
                <Button onPress={editModal.onClose}>Cancelar</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
