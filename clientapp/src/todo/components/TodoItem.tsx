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
            <Tooltip
              content={`Creación: ${
                todo.creationDate
                  ? `${new Date(
                      todo.creationDate
                    ).toLocaleDateString()} ${new Date(
                      todo.creationDate
                    ).toLocaleTimeString()}`
                  : "No disponible"
              }`}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <span>{todo.description}</span>
              </div>
            </Tooltip>
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

// interface props {
//   todo: Todo;
//   statusColor:
//     | "default"
//     | "primary"
//     | "secondary"
//     | "success"
//     | "warning"
//     | "danger"
//     | undefined;
// }

// export const TodoItem = ({ todo, statusColor }: props) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedDescription, setEditedDescription] = useState(todo.description);
//   const { toggleTodo, removeTodo, updateTodo } = useContext(TodoContext);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);

//   const { isOpen: isDeleteModalVisible, onClose: toggleDeleteModal } =
//     useDisclosure();
//   const { isOpen: isEditModalVisible, onClose: toggleEditModal } =
//     useDisclosure();

// ;

//   const [backdrop, setBackdrop] = useState('opaque');
//   const { isOpen: isDeleteModalOpen, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure();
//   const { isOpen: isEditModalOpen, onOpen: onOpenEditModal, onClose: onCloseEditModal } = useDisclosure();

//   const handleDeleteConfirm = () => {
//     removeTodo(todo.id);
//     setIsDeleteModalOpen(false);
//   };

//   const handleEditConfirm = () => {
//     updateTodo(todo.id, { ...todo, description: editedDescription });
//     setIsEditModalOpen(false);
//   };

//   const handleToggle = () => {
//     toggleTodo(todo.id);
//   };

//   const handleDelete = () => {
//     const isConfirmed = window.confirm(
//       "¿Estás seguro de que deseas eliminar esta tarea?"
//     );
//     if (isConfirmed) {
//       removeTodo(todo.id);
//     }
//   };

//   const handleEdit = () => {
//     if (!todo.completed) {
//       setIsEditing(true);
//     } else {
//       alert("No se puede editar una tarea completada.");
//     }
//   };

//   const handleSaveEdit = () => {
//     updateTodo(todo.id, { ...todo, description: editedDescription });
//     setIsEditing(false);
//   };
//   console.log(todo.description, todo.completed);

//   return (
//     <div style={{ opacity: todo.completed ? 0.5 : 1 }}>
//       <Checkbox
//         aria-label={todo.description}
//         checked={todo.completed}
//         disabled={todo.completed} // Deshabilita si la tarea está completada
//         isDisabled={todo.completed}
//         value={todo.id}
//         onChange={() => {
//           if (!todo.completed) {
//             handleToggle(); // Cambiar estado solo si no está completada
//           }
//         }}
//         classNames={{
//           base: cn(
//             "inline-flex max-w-md w-full bg-content1 m-0",
//             "hover:bg-content2 items-center justify-start",
//             "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
//             "data-[selected=true]:border-primary"
//           ),
//           label: "w-full",
//         }}

//         // ...resto de las propiedades del Checkbox...
//       >
//         <div className="w-full flex justify-between items-center gap-2">
//           <div className="flex items-center gap-2">
//             <span>{todo.description}</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <Chip color={statusColor} size="sm" variant="flat">
//               {todo.completed ? "Completada" : "Pendiente"}
//             </Chip>
//             {/* <button onClick={handleEdit} disabled={todo.completed}>
//               <FaEdit />
//             </button>
//             <button onClick={handleDelete}>
//               <FaTrash />
//             </button> */}
//           </div>
//           {/* Botón de editar */}
//           <button
//             onClick={() => setIsEditModalOpen(true)}
//             disabled={todo.completed}
//           >
//             <FaEdit />
//           </button>

//           {/* Botón de eliminar */}
//           <button onClick={() => setIsDeleteModalOpen(true)}>
//             <FaTrash />
//           </button>
//         </div>
//       </Checkbox>
//       {/* Modal de confirmación de eliminación */}
//       <Modal
//         isOpen={isDeleteModalOpen}
//         onClose={toggleDeleteModal}
//         // onClose={() => setIsDeleteModalOpen(false)}
//       >
//         <ModalHeader>Confirmar eliminación</ModalHeader>
//         <ModalBody>¿Estás seguro de que deseas eliminar esta tarea?</ModalBody>
//         <ModalFooter>
//           <Button color="primary" onPress={handleDeleteConfirm}>
//             Eliminar
//           </Button>
//           <Button onPress={() => setIsDeleteModalOpen(false)}>Cancelar</Button>
//         </ModalFooter>
//       </Modal>
//       {/* Modal de edición */}
//       <Modal
//         isOpen={isEditModalOpen}
//         onClose={toggleEditModal}
//         // onClose={() => setIsEditModalOpen(false)}
//       >
//         <ModalHeader>Editar tarea</ModalHeader>
//         <ModalBody>
//           <Input
//             fullWidth
//             value={editedDescription}
//             onChange={(e) => setEditedDescription(e.target.value)}
//           />
//         </ModalBody>
//         <ModalFooter>
//           <Button color="primary" onPress={handleEditConfirm}>
//             Guardar cambios
//           </Button>
//           <Button onPress={() => setIsEditModalOpen(false)}>Cancelar</Button>
//         </ModalFooter>
//       </Modal>
//     </div>
//   );
// };

// // export const TodoItem = ({ todo, statusColor }: props) => {
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [editedDescription, setEditedDescription] = useState(todo.description);
// //   const { toggleTodo, removeTodo, updateTodo } = useContext(TodoContext);

// //   const handleDelete = () => {
// //     const isConfirmed = window.confirm(
// //       "¿Estás seguro de que deseas eliminar esta tarea?"
// //     );
// //     if (isConfirmed) {
// //       removeTodo(todo.id);
// //     }
// //   };

// //   const handleEdit = () => {
// //     setIsEditing(true);
// //   };

// //   const handleSaveEdit = () => {
// //     updateTodo(todo.id, { ...todo, description: editedDescription });
// //     setIsEditing(false);
// //   };
// //   const handleChange = () => {
// //     toggleTodo(todo.id);
// //   };

// //   console.log("todo", todo);

// //   return (
// //     <div style={{ opacity: todo.completed ? 0.5 : 1 }}>
// //       {" "}
// //       {/* Aplicar estilo condicional */}
// //       <Checkbox
// //         aria-label={todo.description}
// //         classNames={{
// //           base: cn(
// //             "inline-flex max-w-md w-full bg-content1 m-0",
// //             "hover:bg-content2 items-center justify-start",
// //             "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
// //             "data-[selected=true]:border-primary"
// //           ),
// //           label: "w-full",
// //         }}
// //         value={todo.id}
// //         onChange={handleChange}
// //         checked={todo.completed}
// //       >
// //         <div className="w-full flex justify-between items-center gap-2">
// //           <div className="flex items-center gap-2">
// //             <span>{todo.description}</span>
// //           </div>
// //           <div className="flex items-center gap-1">
// //             <Chip color={statusColor} size="sm" variant="flat">
// //               {todo.completed ? "Completada" : "Pendiente"}
// //             </Chip>
// //             <button onClick={handleEdit}>
// //               <FaEdit />
// //             </button>
// //             <button onClick={handleDelete}>
// //               <FaTrash />
// //             </button>
// //           </div>
// //         </div>
// //       </Checkbox>
// //     </div>
// //   );
// // };
