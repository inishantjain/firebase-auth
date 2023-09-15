import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { TaskManager } from "../components/TaskManager";
import { TaskModalProvider } from "../contexts/useTaskModal";

function Dashboard() {
  const { logOut } = useAuth()!;
  const { currentUser } = useAuth()!;

  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut();
    navigate("/auth");
  };

  return (
    <div className="dashboard">
      <div className="tasks">
        <div className="greeting">
          <h1>{currentUser?.displayName && `Hii..${currentUser.displayName} `} Your Tasks</h1>
          <button id="logout" onClick={handleLogOut}>
            Log out
          </button>
        </div>
        <TaskModalProvider>
          <TaskManager />
        </TaskModalProvider>
      </div>
    </div>
  );
}

export default Dashboard;
