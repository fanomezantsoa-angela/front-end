import axios from "axios";
const getToken = localStorage.getItem("token") 
const getAuthorizationHeader = `Bearer ${getToken}`;
const axiosInstance = axios.create({
  baseURL: "https://ecommerce-pm4j.onrender.com", 
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
      const response = await axiosInstance.get("/api/type_product/", 
        {
      headers: {
        Authorization: getAuthorizationHeader,
      },
        });
      console.log(typeof response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};
export const login = async (formData) => {
  try {
    const response = await axiosInstance.post("/api/token/", formData, {
      "content-type": "application/json",
    });

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