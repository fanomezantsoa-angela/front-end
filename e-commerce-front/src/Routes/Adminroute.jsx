import Cookies from "js-cookie"
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Hooks/Auth";
import { useContext } from "react";
const AdminRoute = () => {
 const {isAdmin} = useContext(AuthContext)
 
  if (!(Cookies.get("token")) ) {
    return <Navigate to="/Login" />;
  }

  return isAdmin && <Outlet />;
};

export default AdminRoute;
