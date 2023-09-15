import Auth from "./pages/Auth";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import ResetPassword from "./pages/ResetPassword";
export default function App() {
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="auth"
          element={
            <PublicRoute>
              <Auth />
            </PublicRoute>
          }
        />

        <Route path="forgot-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}
