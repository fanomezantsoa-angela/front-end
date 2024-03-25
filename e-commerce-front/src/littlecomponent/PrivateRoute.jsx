import { Navigate, Outlet } from "react-router-dom";
import Auth from "../Hooks/Auth"; // Custom hook for checking authentication state

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = Auth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children || <Outlet />;
};
export default PrivateRoute;