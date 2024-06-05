import axiosInstance from "../axios/axiosConfig";
import Cookies from "js-cookie"
const getToken = Cookies.get("token");
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
  let feedback = { err: null, response: null, res:false}
  try{
    const response = await axiosInstance.post("/order/", Formdata, {
      headers: {
        Authorization: getAuthorizationHeader,
      },
    });
    if (response.status == 201) {
      feedback.res = true;
      feedback.response = response
      return feedback;
    }
    
  } catch (error) {
     console.log(error);
     feedback.err = error;
     return feedback;
    
  }

};

