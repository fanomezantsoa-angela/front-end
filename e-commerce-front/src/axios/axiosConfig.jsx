import axios from "axios";
import { checkTokenExpiry, refresh_Token } from "../Hooks/Tokencheck";

const axiosInstance = axios.create({
    // baseURL: process.env.BASE_API_URL,
    baseURL: "https://ecommerce-pm4j.onrender.com/api/"
});
  axiosInstance.interceptors.request.use(
    async (config) => {
      let token = localStorage.getItem("token");
      if (token && checkTokenExpiry(token)) {
        console.log("Token expired. Attempting to refresh.");
        try {
          const data = await refresh_Token(); // Attempt to refresh token
          token = data.access; // Update token with new access token
          refreshToken = data.refresh
          localStorage.setItem("token", token);
          localStorage.setItem("refreshToken", refreshToken) // Optionally update storage with new token
        } catch (error) {
          // Handle error, e.g., redirect to login
          console.error("Token refresh failed:", error);
          window.location.href = "/login"; // Redirect user to login page
          return Promise.reject(error);
        }
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

export default axiosInstance