import axios from "axios";


const axiosInstance = axios.create({
    // baseURL: process.env.BASE_API_URL,
<<<<<<< HEAD
    baseURL: "https://ecommerce-pm4j.onrender.com/api/"
    // baseURL: "http://localhost:8000/api/"
=======

     baseURL: "https://ecommerce-pm4j.onrender.com/api/"
      //baseURL: "http://localhost:8000/api/"

>>>>>>> 29c3c7864c2b193c15f1e0a1b1a795bd3e2d8960
  });

export default axiosInstance