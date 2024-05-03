
export const tokenExtractor = () => {
    const token = localStorage.getItem("token")
    return (token) ? token : null
}