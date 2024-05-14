import axiosInstance from "../axios/axiosConfig"
import { tokenExtractor } from "./tokenExtractor"

export const createContact = async (data) => {
    let feedback = {res: false, error: null} 
    const token = tokenExtractor()
    if (tokenExtractor() != null) {
        console.log(token)
        try {
            const response = await axiosInstance({
                url: "contact/",
                method: "POST",
                data: data,
                headers: {
                    Authorization: `Bearer ${tokenExtractor()}`
                }
            })
            console.log(response)
            if (response.status == 200){
                feedback.res = true
                console.log("incontact")
                return feedback
            } else if(response.status == 401) {
                feedback.error = "Operation non autorise, veuiller d'abord vous connecter."
                return feedback
            }
            
        } catch (error) {
            console.log(error)
            feedback.error = "Erreur lors de l'envoie du contact"
            return feedback
        }
    } else {
        return feedback
    }
}
export const GetContact = async () => {
    let feedback = {res: false, error: null, response:null} 
    const token = tokenExtractor()
    if (tokenExtractor() != null) {
        
        try {
            const responsecontact = await axiosInstance({
                url: "contact/",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${tokenExtractor()}`
                }
            })
            console.log(responsecontact)
            if (responsecontact.status == 200){
                feedback.res = true
                feedback.response= responsecontact.data.results
                console.log(responsecontact)
                return feedback
            } else if(responsecontact.status == 401) {
                feedback.error = "Operation non autorise, veuiller d'abord vous connecter."
                return feedback
            }
            
        } catch (error) {
            console.log(error)
            feedback.error = "Erreur lors de  du contact"
            return feedback
        }
    } else {
        return feedback
    }
}