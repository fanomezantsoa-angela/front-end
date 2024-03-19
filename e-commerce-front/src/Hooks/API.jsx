import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.43.150:8000", // Replace this with your API base URL
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
