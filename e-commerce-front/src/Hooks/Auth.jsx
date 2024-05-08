import { createContext, useState, useEffect } from "react";
import { isAdmin as checkIsAdmin, decodeToken } from "./Usersetting";
import Swal from "sweetalert2";
import {refresh_Token} from "../Hooks/Tokencheck"
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect( () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    // console.log(!!token)
    setIsAdmin(checkIsAdmin());
    // console.log("admin?", checkIsAdmin())
  }, []);
  const refreshToken = async () => {
    try{
      const response = await refresh_Token();
      
     const newtoken = response.access
     const newrefresh = response.refresh
     localStorage.setItem("token", newtoken)
     localStorage.setItem("refreshToken", newrefresh)
    }catch(error){
      console.log(error);
      Swal.fire({
        title: "Erreur",
        text: "renouvellement de token echoué, veuillez vous connecter",
        icon: "error",
      
      });
      logout();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken();
    }, 55 * 60 * 1000); 

    return () => clearInterval(interval);
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
