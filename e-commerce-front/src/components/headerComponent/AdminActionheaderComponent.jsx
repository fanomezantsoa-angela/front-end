import GererAdminCompte from "./GererAdminCompte"
import AdminNotificationComponent from "../notification/AdminNotificationComponent"
import { useNavigate } from "react-router-dom"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Tooltip from "@mui/material/Tooltip";


export default function AdminActionHeaderComponent() {
    const navigate = useNavigate()

    const goToHome = () => {
        navigate("/")
    }



    return (

        <>
            <div className="w-[100%] justify-evenly flex items-center flex-row px-2">

                <div className="">
                    <AdminNotificationComponent/>
                </div>
                
                <div className="px-2" onClick={goToHome}>
                    <Tooltip title="Retour a l'acceuil">
                        <HomeOutlinedIcon sx={{fontSize: 55 }} 
                        className="text-sky-700 hover:scale-110 hover:bg-slate-100 duration-100 cursor-pointer rounded-full py-2" />
                    </Tooltip>
                </div>

                <div className="">
                    <GererAdminCompte />
                </div>
                
              
            </div>
      </>
    )
}