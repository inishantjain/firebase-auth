import { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useAuth()!;
  if (currentUser) return children;
  return <Navigate to={"/auth"} />;
};

export default PrivateRoute;
