import axios from "axios";


const axiosInstance = axios.create({
    // baseURL: process.env.BASE_API_URL,
    baseURL: "https://ecommerce-pm4j.onrender.com/api/"
      // baseURL: "http://localhost:8000/api/"
  });

export default axiosInstance