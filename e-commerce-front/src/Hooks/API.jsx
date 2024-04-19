import axiosInstance from "../axios/axiosConfig";

export const postProduct = async (formData) => {
  try {
    const response = await axiosInstance.post("product/", formData);
    return response;
  } catch (error) {
    throw error;
    }
  
};
export const type_product = async () => {
    try {
      const response = await axiosInstance.get("type_product/");
      console.log(typeof response);
        return response;
    } catch (error) {
        throw error;
    }
};
export const login = async (formData) => {

  const response = await axiosInstance.post("token/", formData, {
    "content-type": "application/json",
  });

  return response;
}
export const inscription = async (formData) => {
  try {
    const response = await axiosInstance.post("client/", formData);
    return response;
  } catch (error) {
    throw error;
  }

};