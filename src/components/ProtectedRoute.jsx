import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;
  return <Outlet />;
};