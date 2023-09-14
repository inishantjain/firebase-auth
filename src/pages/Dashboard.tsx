import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const { logOut } = useAuth()!;
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut();
    navigate("/auth");
  };
  return (
    <div className="dashboard">
      <h1>Welcome User</h1>
      <button onClick={handleLogOut}>Log out</button>
    </div>
  );
}

export default Dashboard;
