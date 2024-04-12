import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ecommerce-pm4j.onrender.com",
});
export const Product_list = async () => {
  try {
      const response = await axiosInstance.get("/api/product/");
    return response.data;
  } catch (error) {
    throw error;
  }
};
