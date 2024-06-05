import { apiRequest } from "./RequestAction";
import { tokenExtractor } from "./tokenExtractor";

export const getAllProduct = async (type=null) => {
    const token = tokenExtractor()

    if (token != null) {
        let result = null
        let request = (type==null) ? 
        `product/${type}/by_category/` :
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


export const createPorduct = async () => {
    const token = tokenExtractor()

    if (token != null ){

    } else {
        let feedback = {res:false, error:"Veuiller vour connecter avant de pouvoir pleinement utiliser l'application."} 
        return feedback
    }
}



export const updateProductImage = async (id, formdata) => {
    console.log({id, formdata})
    return true
}