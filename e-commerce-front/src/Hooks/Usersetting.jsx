import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie"

// Function to decode token
export const decodeToken = (token) => {
  if(token){
    try {
      
      return jwtDecode(token);
    } catch (error) {
      console.error("Failed to decode JWT:", error);
      return null;
    }
  }
  else {
    return "token introuvable"
  }
  
};

// Function to check if the user is admin
export const isAdmincheck = () => {
  
  const token = Cookies.get("token");
 

  const decodedToken = decodeToken(token);
  console.log(decodedToken.isAdmin)
  
  return decodedToken.isAdmin;
   
};

