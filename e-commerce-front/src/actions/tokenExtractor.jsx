import Cookies from "js-cookie"


export const tokenExtractor = () => {
    const token = Cookies.get("token")
    return (token) ? token : null
}