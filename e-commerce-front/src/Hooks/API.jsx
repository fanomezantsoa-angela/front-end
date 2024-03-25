import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ecommerce-pm4j.onrender.com", // Replace this with your API base URL
});

export const postProduct = async (formData) => {
  try {
    const response = await axiosInstance.post("/api/product/", formData);
    return response.data;
  } catch (error) {
    throw error;
    }
  
};
export const type_product = async () => {
    try {
        const response = await axiosInstance.get("/api/type_product/");
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const login = async (formData) => {
  try {
    const response = await axiosInstance.post("/api/token/", formData, {
      'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
    }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const inscription = async (formData) => {
  try {
    const response = await axiosInstance.post("/api/client/", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};