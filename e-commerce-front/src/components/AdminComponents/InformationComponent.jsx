import { getClientInformation } from "../../actions/InformationActions"
import { useState, useEffect } from "react"
import Avatar from '@mui/joy/Avatar';

export default function InformationComponent() {

    const [adminInformation, setAdminInformation] = useState({first_name: null, last_name: null})


    const getAdminInformation = async () => {
		const adminData = await getClientInformation()	
        // console.log("Before getting client information")
        if(adminData.res){
            const data = {
                first_name: adminData.data.first_name,
                last_name: adminData.data.last_name,
                mail:adminData.data.email,
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

        <div className="flex flex-col text-center justify-center items-center space-y-2 mb-[15%]mt-[10%]">
            {/* Name element */}
            <div>
            <Avatar variant="solid"  sx={{ width: 120, height: 120 }}/>
            </div>
            <div className="uppercase text-sky-800 ">
              <p> {adminInformation.first_name}</p>  
            </div>

            <div className="text-sky-800 mt-[-5%]">
                {adminInformation.last_name}
            </div>
            <div className="text-sky-800">
                    {adminInformation.mail}
            </div>
        </div>

    )

}