import { createContext, useState, useEffect } from "react";
import { isAdmin as checkIsAdmin, isTokenExpired } from "./Usersetting";
import Swal from "sweetalert2";
import {refresh_Token} from "../Hooks/Tokencheck"
import Cookies from "js-cookie"


export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  



  const refreshingToken = async () => {
  console.log("Insidde refresh token")
    
	const request = await refresh_Token();
	await console.log(request)
    
	if(request.res){
    console.log("*********************")
		let response = request.response
		const newtoken = response.data.access
		const newrefresh = response.data.refresh

    Cookies.set("token", newtoken, {expires: 1/24})
    Cookies.set("refreshToken", newrefresh, {expires: 7})
		setIsLoggedIn(true)
	}else{
		
		Swal.fire({
			title: "Erreur",
			text: "renouvellement de token echoué, veuillez vous connecter",
			icon: "error",
		});
    console.log("removing refresh")
		// Cookies.remove("refreshToken")
		// logout();
	}
  };

const checkCookievalidation = () => {
    const refreshToken =  Cookies.get("refreshToken") ;  
    const token = Cookies.get("token") 
    console.log("Checking from local storage expiration")
    // console.log(token)
    
    return ((token) && refreshToken) ? true : false
  
}


 const logout = () => {
    console.log("INSIFDE LOGOUT FUNCTUIONS")
    Cookies.remove("token");
    Cookies.remove("refreshToken")
    setIsLoggedIn(false)
   
  };
 

  useEffect(() => {
    const existence = checkCookievalidation()
    console.log(existence)
    // const unpronoucedFunction = ((!existence) && refreshingToken())
    if(!existence){ 
      const refresh = Cookies.get("refreshToken")
      console.log(refresh)
      if (refresh) {
        refreshingToken()
      } else (
        setIsLoggedIn(false)
      )
    }
    
  }, []);

  useEffect( () => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);

   
    
    // if(isLoggedIn==false){
    //   logout();
    // }

  }, []);

  
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isAdmin, logout, setIsAdmin }}>
      {children}
  
    

    </AuthContext.Provider>
  );
};
