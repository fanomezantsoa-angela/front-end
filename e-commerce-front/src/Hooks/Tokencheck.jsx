import axiosInstance from "../axios/axiosConfig" 
import Cookies from "js-cookie"

export const refresh_Token = async () => {
  let feedback = {res : false, error: null, response: null}
	try {
		const refreshToken = Cookies.get("refreshToken");
		console.log(refreshToken)
	// assuming you store refresh token in local storage
		const response = await axiosInstance({
			url: "token/refresh/",
			method: "POST",
			data: {
				refresh: refreshToken
			}			
		})
		;
		console.log(response);
		if(response.status == 200){
			feedback.res = true
			feedback.response = response
			return feedback; // should return new tokens
		}

	} catch (error) {
		console.error("Failed to refresh token:", error);
		feedback.error = error
		return feedback
	}
};
