import axios from "axios";

export const refresh_Token = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
   // assuming you store refresh token in local storage
    const response = await axios.post(
      "https://ecommerce-pm4j.onrender.com/api/token/refresh/",
      {refresh: refreshToken }
    );
    console.log(response.data);
    return response.data; // should return new tokens
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error;
  }
};
