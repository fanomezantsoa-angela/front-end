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
export const Product_search = async (name) => {
  try {
    const response = await axiosInstance.get(`/product/search/name/${name}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const Product_rating = async (id, value) => {
  console.log(getToken)
  try {
    
    const response =  await axiosInstance({
      method: "POST",
      url: `/product/${id}/rate/`,
      headers: {
        Authorization: getAuthorizationHeader,
      },
      data: value,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
