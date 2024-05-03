import { createContext, useState, useEffect } from "react";
import { isAdmin as checkIsAdmin, decodeToken } from "./Usersetting";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect( () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    console.log(!!token)
    setIsAdmin(checkIsAdmin());
    console.log("admin?", checkIsAdmin())
  }, []);
 const logout = () => {
  
    localStorage.removeItem("token");
    setIsLoggedIn(false)
   
  };
 

  
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
