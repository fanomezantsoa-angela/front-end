import axiosInstance from "../axios/axiosConfig"
import Cookies from "js-cookie"
const getToken = Cookies.get("token");
const getAuthorizationHeader = `Bearer ${getToken}`;
export const achat_histo = async()=>{
   let feedback={res:true, err:null, response:null }
    try{
        const apiresponse= await axiosInstance.get("purchase/for/user/", 
        {
            headers: {
              Authorization: getAuthorizationHeader, // Note: Call the function to get the authorization header
            },
          }
        )
        console.log(apiresponse)
        if(apiresponse.status == 200){
            feedback.res=true
            feedback.response= apiresponse
            return feedback;
        }
    }catch(error){
        console.log(error)
        feedback.err= error
        return feedback;
    }
} 
export const achat_detail= async(id)=>{
  let feedback={res:true, err:null, response:null }
   try{
       const apiresponse= await axiosInstance.get(`purchase/${id}/`, 
       {
           headers: {
             Authorization: getAuthorizationHeader, // Note: Call the function to get the authorization header
           },
         }
       )
       console.log(apiresponse)
       if(apiresponse.status == 200){
           feedback.res=true
           feedback.response= apiresponse
           return feedback;
       }
   }catch(error){
       console.log(error)
       feedback.err= error
       return feedback;
   }
}
export const achats = async () => {
  let feedback = { res: true, err: null, response: null };
  try {
    const apiresponse = await axiosInstance.get("purchase/", {
      headers: {
        Authorization: getAuthorizationHeader, // Note: Call the function to get the authorization header
      },
    });
    console.log(apiresponse);
    if (apiresponse.status == 200) {
      feedback.res = true;
      feedback.response = apiresponse;
      return feedback;
    }
  } catch (error) {
    console.log(error);
    feedback.err = error;
    return feedback;
  }
};  
export const achats_validation = async (date, id) => {
  let feedback = { res: true, err: null, response: null };
  try {
    const apiresponse = await axiosInstance.get(`/purchase/${id}/delivery/`, date, {
      headers: {
        Authorization: getAuthorizationHeader, // Note: Call the function to get the authorization header
      },
    });
    console.log(apiresponse);
    if (apiresponse.status == 200) {
      feedback.res = true;
      feedback.response = apiresponse;
      return feedback;
    }
  } catch (error) {
    console.log(error);
    feedback.err = error;
    return feedback;
  }
};
