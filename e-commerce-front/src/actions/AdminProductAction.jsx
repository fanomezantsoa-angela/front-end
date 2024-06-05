import { apiRequest } from "./RequestAction";
import { tokenExtractor } from "./tokenExtractor";
import axiosInstance from "../axios/axiosConfig";

export const getAllProduct = async (type=null) => {
    const token = tokenExtractor()

    if (token != null) {
        let result = null
        let request = (type==null) ? 
        `product/${10}/by_category/` :
        `product/${type}/by_category/`
        
        result = await apiRequest(request, "GET", token, null)
        let feedback = {res: false, error:null, data: null}
        // console.log(result, "REQUEST RESULT.....")
        if (result.error == null){
            const responseCode = result.response.status 
            if (responseCode == 200){
                feedback.res = true
                feedback.data = result.response.data
                // console.log(feedback, "/*/*/*/*/*/*/*/*/*/*/*/*/*/*/")
            } else if (responseCode == 404) {
                feedback.error = "Une erreur est survenu lors de la chargement des produits, veuiller reessayer ulterieurement."
            }
        }

        return feedback
    } else {
        let feedback = {res:false, error:"Veuiller vour connecter avant de pouvoir pleinement utiliser l'application."} 
        return feedback
    }
}


export const createProduct = async (data) => {
    const token = tokenExtractor()

    if (token != null ){
        let feedback = {res: false, error:null, data: null}
        let result = await apiRequest("product/", "POST", token, data)
        console.log(result, "INSIDE RESULT")
        if (result.error == null) {
            const responseCode = result.response.status
            console.log(result.response.status)
            if (responseCode == 201){
                feedback.res = true
                feedback.data = result.response.data
                // console.log(feedback, "/*/*/*/*/*/*/*/*/*/*/*/*/*/*/ DATA FROM PRODUCT CREATION")
            } else if (responseCode == 400) {
                feedback.error = "Une erreur est survenu lors de la chargement des produits, veuiller reessayer ulterieurement."
            }
            return feedback
        }
    } else {
        let feedback = {res:false, error:"Veuiller vour connecter avant de pouvoir pleinement utiliser l'application."} 
        return feedback
    }
}



export const updateProduct = async (data) => {
    const token = tokenExtractor()

    if (token != null ){
        let feedback = {res: false, error:null, data: null}
        let result = await apiRequest(`product/${data.id}/`, "PUT", token, data)
        // console.log(result, "INSIDE RESULT")
        if (result.error == null) {
            const responseCode = result.response.status
            console.log(result.response.status)
            if (responseCode == 200){
                feedback.res = true
                feedback.data = result.response.data
                // console.log(feedback, "/*/*/*/*/*/*/*/*/*/*/*/*/*/*/ DATA FROM PRODUCT CREATION")
            } else if (responseCode == 400) {
                feedback.error = "Une erreur est survenu lors de la chargement des produits, veuiller reessayer ulterieurement."
            }
            return feedback
        }
    } else {
        let feedback = {res:false, error:"Veuiller vour connecter avant de pouvoir pleinement utiliser l'application."} 
        return feedback
    }
}


export const updateProductImage = async (id, formdata) => {
    // http://127.0.0.1:8000/api/product/{id}/update_image/
    const token = tokenExtractor()
    let feedback = {res: false, error:null, data: null}
    try {
        const response = await axiosInstance.put(`product/${id}/update_image/`, formdata, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          },
        });
        console.log(response)
        console.log('Image uploaded successfully:', response.data);
        
        if (response.status == 201) {
            feedback.res = true
        } else if (response.status == 400) {
            feedback.error = "Une erreur est survenu. Veuiller reessayer."
            console.log(response)
        }
        return feedback

    } catch (error) {
        console.error('Error updating product image:', error);
        feedback.error = "Une erreur est survenu lors de la mise a jour de l'image."
        return feedback
    }
}


export const deleteProduct = async (id) => {
    const token = tokenExtractor()

    if (token != null ){
        let feedback = {res: false, error:null, data: null}
        let result = await apiRequest(`product/${id}/`, "DELETE", token, null)
        if (result.error == null) {
            const responseCode = result.response.status
            console.log(result.response.status)
            if (responseCode == 204){
                feedback.res = true
                feedback.data = result.response.data
            } else if (responseCode == 400) {
                feedback.error = "Une erreur est survenu lors de la chargement des produits, veuiller reessayer ulterieurement."
            }
            return feedback
        }
    } else {
        let feedback = {res:false, error:"Veuiller vour connecter avant de pouvoir pleinement utiliser l'application."} 
        return feedback
    }
}
