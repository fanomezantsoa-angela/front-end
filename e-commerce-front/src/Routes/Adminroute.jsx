import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Hooks/Auth";

const AdminRoute = () => {
  const { isLoggedIn, isAdmin } = useContext(AuthContext);
  console.log(isLoggedIn)
  if (!isLoggedIn) {
    return <Navigate to="/Login" />;
  }

  return isAdmin && <Outlet />;
};

export default AdminRoute;
