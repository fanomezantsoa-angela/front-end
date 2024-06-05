import Panier from "../PanierComponent/Panier";
import GererCompte from "./GererCompte";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import NotificationComponent from "../notification/NotificationCOmponent";
function Userthings_valide() {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/")
    }
    return (
      <>
        <div className="w-[100%] justify-between flex items-center flex-row px-6">

          <div className="px-2">
            <NotificationComponent/>
          </div>
          
          <div className="px-2">
        <div className="px-2" onClick={goToHome}>
                    <Tooltip title="Retour a l'acceuil">
                        <HomeOutlinedIcon sx={{fontSize: 55 }} 
                        className="text-sky-700 hover:scale-110 hover:bg-slate-100 duration-100 cursor-pointer rounded-full py-2" />
                    </Tooltip>
        </div>          
                
            </div>
          
          <div className="">
            <GererCompte />
          </div>

        </div>
      </>
    );
}
export default Userthings_valide