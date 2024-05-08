import { getClientInformation } from "../../actions/InformationActions"
import { useState, useEffect } from "react"

export default function InformationComponent() {

    const [adminInformation, setAdminInformation] = useState({first_name: null, last_name: null})


    const getAdminInformation = async () => {
		const adminData = await getClientInformation()	
        // console.log("Before getting client information")
        if(adminData.res){
            const data = {
                first_name: adminData.data.first_name,
                last_name: adminData.data.last_name
            }
            setAdminInformation(data)
        } else {
            setAdminInformation({first_name:"Inconnue", last_name:"Inconnue"})
        }
	}


	useEffect(() => {
		getAdminInformation()
	}, [])

    useEffect(() => {
    }, [adminInformation])

    return (

        <div className="flex flex-col text-center justify-center items-center space-y-2">
            {/* Name element */}
            <div className="uppercase text-sky-800">
                {adminInformation.first_name}
            </div>

            <div className="text-sky-800">
                {adminInformation.last_name}
            </div>
        </div>

    )

}