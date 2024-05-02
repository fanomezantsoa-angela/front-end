import { createContext, useState, useEffect } from "react";
import { isAdmin as checkIsAdmin } from "./Usersetting";
export const logout = () => {
 
  localStorage.removeItem("token");
 
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    console.log(!!token)
    setIsAdmin(checkIsAdmin());
    console.log("admin?", isAdmin)
  }, []);
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
