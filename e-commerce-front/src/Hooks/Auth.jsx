import { createContext, useState, useEffect } from "react";
import { isAdmin as checkIsAdmin, isTokenExpired } from "./Usersetting";
import Swal from "sweetalert2";
import {refresh_Token} from "../Hooks/Tokencheck"
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  



  useEffect( () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

   
    
    if(isLoggedIn==false){
      logout();
    }

  }, []);
  const refreshingToken = async () => {
    
    
      const response = await refresh_Token();
     
     if(response.status == 200){
      
     const newtoken = response.data.access
     const newrefresh = response.data.refresh
     localStorage.setItem("token", newtoken)
     localStorage.setItem("refreshToken", newrefresh)
     setIsLoggedIn(true)
     }else{
   
      Swal.fire({
        title: "Erreur",
        text: "renouvellement de token echoué, veuillez vous connecter",
        icon: "error",
      
      });
      localStorage.removeItem("refreshToken")
      logout();
    }
  };

  useEffect(() => {
    const refreshToken =  localStorage.getItem("refreshToken") ;  
    const token= localStorage.getItem("token") 
    if(isTokenExpired(token) && refreshToken || (!token) && refreshToken){
    
      refreshingToken();
      
     
  }
  
    
  }, []);
 const logout = () => {
  
    localStorage.removeItem("token");
    setIsLoggedIn(false)
   
  };
 

  
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isAdmin, logout, setIsAdmin }}>
      {children}
  
    

    </AuthContext.Provider>
  );
};
