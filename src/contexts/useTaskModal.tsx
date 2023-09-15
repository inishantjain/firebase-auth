import { ReactNode, useContext } from "react";
import { createContext } from "react";
import { useState } from "react";
import { useRef } from "react";
import { createUserTasks, updateTask } from "../services/task-manage";
import { useAuth } from "./AuthContext";

const ModalContext = createContext<ModalContextType | null>(null);

export function useTaskModal() {
  return useContext(ModalContext);
}

export const TaskModalProvider = ({ children }: { children: ReactNode }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const { currentUser } = useAuth()!;

  const [task, setTask] = useState({
    title: "",
    description: "",
    docId: "", //task doc unique id in firebase
  });

  function showModal(taskData?: { docId: string; title?: string; description?: string }) {
    if (taskData) {
      const { docId, title = "", description = "" } = taskData;
      setTask({ docId, title, description });
    }
    dialogRef.current?.showModal();
  }

  function closeModal() {
    dialogRef.current?.close();
  }

  const changeHandle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!task.title || !task.description) return;
    if (currentUser) {
      if (task.docId !== "") await updateTask(task.docId, task);
      else await createUserTasks(currentUser.uid, task.title, task.description);
    }
    closeModal();
  };
  return (
    <ModalContext.Provider value={showModal}>
      {children}

      {/* modal */}
      <dialog
        onClick={(e) => {
          const dialogDimensions = dialogRef.current?.getBoundingClientRect();
          if (
            e.clientX < dialogDimensions!.left ||
            e.clientX > dialogDimensions!.right ||
            e.clientY < dialogDimensions!.top ||
            e.clientY > dialogDimensions!.bottom
          ) {
            dialogRef.current?.close();
          }
        }}
        ref={dialogRef}
      >
        <div className="taskCreateDialog">
          <h1>Create todo</h1>
          <input onChange={changeHandle} value={task.title} name="title" type="text" placeholder="Enter Title" />
          <textarea onChange={changeHandle} value={task.description} name="description"></textarea>
          <button onClick={handleSave}>Save</button>
        </div>
      </dialog>
    </ModalContext.Provider>
  );
};
