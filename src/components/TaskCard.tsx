import { TaskType } from "../types/types.task";
import { deleteUserTasks, updateTask } from "../services/task-manage";
import { useTaskModal } from "../contexts/useTaskModal";
const TaskCard = ({
  title,
  description,
  isCompleted,
  docId,
  updateTaskView,
}: TaskType & { updateTaskView: () => void }) => {
  const showModal = useTaskModal()!;
  async function updateHandler() {
    showModal({ docId, title, description });
  }
  async function deleteHandler() {
    try {
      await deleteUserTasks(docId);
      console.log("Deleted Task");
      updateTaskView();
    } catch (error) {
      console.log("An error occurred", error); //FIXME: render error on screen
    }
  }

  async function markTaskComplete() {
    await updateTask(docId, { isCompleted: true });
    updateTaskView();
  }
  return (
    <div className="task-card">
      <div className="content">
        <h3 className="title">{title}</h3>
        <p>{description}</p>
        {isCompleted ? (
          <span className="task-complete">
            <i className="fa-solid fa-check"></i> Completed.
          </span>
        ) : (
          <span className="task-not-complete">
            <i className="fa-solid fa-circle-exclamation"></i> Not Completed.
          </span>
        )}
      </div>
      <div className="task-btn-container">
        <button onClick={updateHandler}>
          <i className="fa-solid fa-file-pen"></i>
        </button>
        <button onClick={deleteHandler}>
          <i className="fa-solid fa-trash"></i>
        </button>
        <button title="mark task completed" onClick={markTaskComplete}>
          <i className="fa-solid fa-check"></i>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
