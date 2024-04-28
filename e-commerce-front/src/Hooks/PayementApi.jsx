import axiosInstance from "../axios/axiosConfig";
const getToken = localStorage.getItem("token");
const getAuthorizationHeader = `Bearer ${getToken}`;
export const validationPayement = async (montant) => {
  try {
    const response = await axiosInstance.put(
      "/purchase/validate_payement/",
      montant,
      {
        headers: {
          Authorization: getAuthorizationHeader, // Note: Call the function to get the authorization header
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Validation Payement Error:"+ error);
    throw error; // Re-throw the error for handling at the caller's level
  }
};
export const creationpurchase = async (Formdata) => {
  try {
    const response = await axiosInstance.post("/purchase/", Formdata, {
      headers: {
        Authorization: getAuthorizationHeader,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const creationorders = async (Formdata) => {
  try {
    const response = await axiosInstance.post("/order/", Formdata, {
      headers: {
        Authorization: getAuthorizationHeader,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }

};

