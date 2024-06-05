import axiosInstance from "../axios/axiosConfig";

export const apiRequest = async (sub_url, method, token=null, data=null) => {
    const parameter = {
        url: sub_url,
        method: method
    }
    if (data != null) parameter.data = data
    if (token != null) parameter.headers = {Authorization: `Bearer ${token}`}
    
    console.log(parameter)
    let requestResult = {response: null, error:null}

    try {
        const response = await axiosInstance(parameter)
        console.log(response)
        requestResult.response = response
        return requestResult
    } catch (error) {
        console.log(error)
        requestResult.error = error
    }

};