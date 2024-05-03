import { jwtDecode } from "jwt-decode";

// Function to decode token
export const decodeToken = (token) => {
  try {

    return jwtDecode(token);
   
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
};

// Function to check if the user is admin
export const isAdmin = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  const decodedToken = decodeToken(token);
  
  return decodedToken && decodedToken.isAdmin;
};
