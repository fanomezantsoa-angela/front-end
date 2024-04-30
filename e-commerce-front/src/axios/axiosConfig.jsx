import axios from "axios";
import { checkTokenExpiry, refresh_Token } from "../Hooks/Tokencheck";

const axiosInstance = axios.create({
    // baseURL: process.env.BASE_API_URL,
    baseURL: "https://ecommerce-pm4j.onrender.com/api/"

});
  axiosInstance.interceptors.request.use(
    async (config) => {
      const accessToken = localStorage.getItem("token"); // Replace with your storage mechanism
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Prevent infinite loops
       
        try {
          const refreshResponse = await refresh_Token(); 
          const newAccessToken = refreshResponse.access;
          const  newrefresh = refreshResponse.refresh
          localStorage.setItem("token", newAccessToken);// Replace with your storage mechanism
          localStorage.setItem("refreshToken", newrefresh);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          if (refreshError.response.status === 403) {
            // Handle refresh token expiration (e.g., logout)
            console.error(
              "Refresh token expired. User needs to re-authenticate."
            );
          } else {
            // Handle other errors gracefully
            console.error("Error refreshing token:", refreshError);
          }
        }
      }
      return Promise.reject(error);
    }
  );

    // baseURL: "http://localhost:8000/api/"



export default axiosInstance