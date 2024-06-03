// import { jwtDecode } from "jwt-decode"
import { apiRequest } from "./RequestAction"
import { tokenExtractor } from "./tokenExtractor"

export const getAllType = async (isOrdered=false ,order=null) => {
    const token = tokenExtractor()

    if(token != null){
        let result = null
        if(order == null && !isOrdered){
            result = await apiRequest("/type_product/", "GET", token, null)
        } else {
            console.log(order)
            result = await apiRequest(`/type_product/order/${order}/`, "GET", null, null)
        }
        let feedback = {res:false, data:null, error:null}
        console.log(result, "All type request result****")
        if (result.error == null){
            if(result.response.status == 200){
                feedback.res = true
                feedback.data = result.response.data
            } else if(result.response.status == 400){
                console.log(result)
                feedback.error = "Une erreur est survenu lors de la chargement des types de produits, veuiller reessayer ulterieurement."
            }
            
            console.log(feedback)
            return feedback
        }
    } else {
        let feedback = {res:false, error:"Veuiller vour connecter avant de pouvoir pleinement utiliser l'application."} 
        return feedback
    }
}