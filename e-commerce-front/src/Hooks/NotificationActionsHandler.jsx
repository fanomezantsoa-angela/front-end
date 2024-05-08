import axiosInstance from "../axios/axiosConfig";



// Get all notification
export const getClientNotification = async () => {
    const token = localStorage.getItem("token")
    let feedback = {res:false, error:null}
    try {
        
        const response = await axiosInstance({
            url: "notification/for/user/",
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        // console.log(response.data)

        if(response.status == 200){
            feedback.res = true
            feedback.data = (response.data.length == 0) ? [] : response.data
            // console.log(response)
            return feedback
        } else if (response.status == 400){
            // console.log(response.data.Erreur)
            feedback.error = response.data.message
        } else {
            return feedback
        }


    } catch (error) {
        console.log("Error inside notification handler | Catch;")
        console.log(error)
        feedback.res = false
        feedback.error = "Une erreur s'est produit, veuiller reessayer ulterieurement."
        return feedback
    }
}

export const getAdminNotification = async () => {
    const token = localStorage.getItem("token")
    let feedback = {res:false, error:null}
    try {
        
        const response = await axiosInstance({
            url: "notification/for/admin/",
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        // console.log(response.data)

        if(response.status == 200){
            feedback.res = true
            feedback.data = (response.data.length == 0) ? [] : response.data
            // console.log(feedback)
            return feedback
        } else if (response.status == 400){
            // console.log(response.data.Erreur)
            feedback.error = response.data.message
        } else {
            // console.log(response)
            return feedback
        }


    } catch (error) {
        console.log("Error inside notification handler | Catch;")
        console.log(error)
        feedback.res = false
        feedback.error = "Une erreur s'est produit, veuiller reessayer ulterieurement."
        return feedback
    }
}


// Mark a notification as seen
export const mark_as_seen = async (id) => {
    let feedback = {res:false, error:null}
    try {
        const token = localStorage.getItem("token")
        const response = await axiosInstance({
            url: `notification/${id}/marked_as_seen/`,
            method: "put",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log("Before alert take place")
        console.log(response.status)
        if( response.status == 200 ) {
            feedback.res = true
            return feedback
        }

    } catch (error) {
        console.log(error)
        feedback.error = "Erreur lors de l'operation, veuiller reessayer utlerieurement."
        return feedback
    }
}
