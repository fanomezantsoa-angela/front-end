import axiosInstance from "../axios/axiosConfig";

const token = localStorage.getItem("token")
const bearerAuthorisation = `bearer ${token}`

// Get all notification
export const getClientNotification = async () => {
    let feedback = {res:false, error:null}
    try {
        
        const response = await axiosInstance({
            url: "notification",
            method: "GET",
            headers: {
                Authorization: bearerAuthorisation
            }
        })

        console.log(response.data)

        if(response.status == 200){
            feedback.res = true
            feedback.data = response.data
            return feedback
        } else if (response.status == 400){
            console.log(response.data.Erreur)
            feedback.error = response.data.message
        } else {
            console.log(response)
            return feedback
        }


    } catch (error) {
        console.log(error)
        feedback.res = false
        feedback.error = "Une erreur s'est produit, veuiller reessayer ulterieurement."
        return feedback
    }
}