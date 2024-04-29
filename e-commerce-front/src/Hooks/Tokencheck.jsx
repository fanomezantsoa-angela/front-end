import axios from "axios";
export function checkTokenExpiry(token) {
  if (!token) return true; // Consider the token expired if not present

  const { exp } = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
  return Date.now() >= exp * 1000; // Convert exp to milliseconds and compare
}
export const refresh_Token = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken"); // assuming you store refresh token in local storage
    const response = await axios.post(
      "https://ecommerce-pm4j.onrender.com/api/token/refresh",
      { refreshToken }
    );
    console.log(response.data);
    return response.data; // should return new tokens
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error;
  }
};
