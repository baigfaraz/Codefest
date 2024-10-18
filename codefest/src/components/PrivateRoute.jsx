import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { user, checkUserRole } = useAuth();

  if (!user) {
    // User not logged in, redirect to login
    return <Navigate to="/login" />;
  }

  const role = checkUserRole();
  if (role === "admin") {
    return <Navigate to="/admin-dashboard" />;
  } else {
    return <Navigate to="/home" />;
  }
};

export default PrivateRoute;
