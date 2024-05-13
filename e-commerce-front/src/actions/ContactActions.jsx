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