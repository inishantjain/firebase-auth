import { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
//cannot be accessed by signed in users
const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useAuth()!;
  if (!currentUser) return children;
  return <Navigate to={"/"} />;
};

export default PublicRoute;
