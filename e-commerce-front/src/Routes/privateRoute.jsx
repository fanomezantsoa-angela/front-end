import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Hooks/Auth";

const PrivateRoute = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn && <Outlet /> ;
};

export default PrivateRoute;
