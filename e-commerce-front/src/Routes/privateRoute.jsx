import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Hooks/Auth";

const PrivateRoute = () => {
 
  return (localStorage.getItem("token")) ? <Outlet /> : Navigate("/login") ;
};

export default PrivateRoute;
