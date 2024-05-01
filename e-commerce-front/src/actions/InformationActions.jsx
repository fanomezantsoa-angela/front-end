import { tokenExtractor } from "./tokenExtractor";
import { apiRequest } from "./RequestAction";
import { jwtDecode } from "jwt-decode";


export const getClientInformation = async () => {

    const token = tokenExtractor()

    if (token != null){
        const decodedToken = jwtDecode(token)
        const result = await apiRequest(`client/${decodedToken.user_id}/`, "GET", token, null)
        let feedback = {res: false, error:null}
        
        if(result.error == null){
            const response = result.response
            
            if(response.status == 200){
                feedback.res = true
                feedback.data = response.data
            } else if (response.status == 404) {
                feedback.error = "Erreur lors de l'operation de recuperation des information de l'utilisateur."
            }

            return feedback
        }

        feedback.error = "Une erreur s'est produite lors de l'operation."
        return feedback
    }
}
