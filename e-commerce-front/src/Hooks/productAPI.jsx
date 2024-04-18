
import axiosInstance from "../axios/axiosConfig";
const getToken = localStorage.getItem("token");
const getAuthorizationHeader = `Bearer ${getToken}`;
export const Product_list = async () => {
  try {
      const response = await axiosInstance.get("/product/");
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const Product_rating = (id) => {

  const response = axiosInstance.get(`/product/${id}/rate`, {
    headers: {
      Authorization: getAuthorizationHeader,
    },
  });
    return response;

};