import Cookies from "js-cookie"
import { Navigate, Outlet } from "react-router-dom";


const AdminRoute = () => {
 
 
  if (!(Cookies.get("token")) ) {
    return <Navigate to="/Login" />;
  }

  return isAdmin && <Outlet />;
};

export default AdminRoute;
