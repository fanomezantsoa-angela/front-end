
import axiosInstance from "../axios/axiosConfig";

export const Product_list = async () => {
  try {
      const response = await axiosInstance.get("/product/");
    return response.data;
  } catch (error) {
    throw error;
  }
};
