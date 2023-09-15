import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { useTaskModal } from "../contexts/useTaskModal";
import { getUserTasks } from "../services/task-manage";
import { TaskType } from "../types/types.task";
import { useAuth } from "../contexts/AuthContext";

export function TaskManager() {
  const { currentUser } = useAuth()!;
  const showModal = useTaskModal()!;
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const fetchTasksAndRenderToView = async () => {
    let fetchedTasks: TaskType[] = []; // Use a different variable name
    if (currentUser) {
      fetchedTasks = await getUserTasks(currentUser.uid);
    }
    setTasks(fetchedTasks);
  };

  useEffect(() => {
    fetchTasksAndRenderToView();
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          showModal();
        }}
        className="create-task-btn"
      >
        Add Task
      </button>
      <div className="task-cards-container">
        {tasks.map((task) => (
          <TaskCard
            key={task.docId} //TODO: fix key prop
            title={task.title}
            description={task.description}
            isCompleted={task.isCompleted}
            docId={task.docId}
            uid=""
            updateTaskView={fetchTasksAndRenderToView}
          />
        ))}
      </div>
    </div>
  );
}
