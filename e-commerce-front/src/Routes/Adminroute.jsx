
import { Navigate, Outlet } from "react-router-dom";


const AdminRoute = () => {
 
 
  if (!(localStorage.getItem("token")) ) {
    return <Navigate to="/Login" />;
  }

  return isAdmin && <Outlet />;
};

export default AdminRoute;
