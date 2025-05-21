import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

// https://medium.com/@sustiono19/how-to-create-a-protected-route-in-react-with-react-router-dom-v7-6680dae765fb