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
export function isTokenExpired(token) {
 
  if(token){
  const decodedToken = decodeToken(token);

  // Check if the token has an expiration claim (exp)
  if (!decodedToken || !decodedToken.exp || !decodedToken.iat) {
    return true; // Consider token invalid if no expiration claim
  }

  // Convert expiration time from seconds to milliseconds
  const expirationTimeMs = (decodedToken.exp - decodedToken.iat) * 1000;

  // Get the current time in milliseconds
  const currentTimeMs = Date.now();

  // Check if the expiration time has passed
  return expirationTimeMs < currentTimeMs;
}
}
