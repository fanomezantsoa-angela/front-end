import "./layout.css";
import Recherche from "./Recherche";
import { useNavigate } from "react-router-dom";
import Userthings from "./Userthings";
import {Button} from "../littlecomponent/Button"
import Panier from "../PanierComponent/Panier";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import Tooltip from "@mui/material/Tooltip";
import Userthings_valide from "./Userthings_valide";
import Paniercomponent from "../PanierComponent/Paniercomponent";
import { useEffect, useContext } from "react";
import { AuthContext } from "../../Hooks/Auth";
// import Produits_type from "./Produits_type";
function Valide_layout() {
  const navigate = useNavigate();
  const { isLoggedIn} = useContext(AuthContext);

  const dirigerLogin = (event) => {
    event.preventDefault(); 
    navigate("/Login");
}
  return (
    <div className="flex flex-row py-10 items-center justify-between w-full bg-white h-[160px] pt-[1%]">

      <section className="basis-1/3 m-0 p-0 flex flex-row items-center">
        
        <img src="./src/assets/socolait.svg" alt="" 
        className="w-[200px] px-3 mt-3"/>

        <section className="flex flex-col ">
          <p className="text-[#27247B] font-extrabold text-2xl ubuntu-bold 
          mt-2">
            Nous partageons <br /> le gout du vrai.
          </p>

          <p className="text-[#27247B] ubuntu-medium mt-2">
            Un pays aussi pur ne peut que <br /> produire le meilleur le lait.
          </p>
        </section>
      
      </section>

      {/* Search bar */}
      {/* <div className="basis-1/3 ">
        <Recherche />
      </div> */}

      {/* User utils */}
      <div className="basis-1/3 flex justify-end w-full">
      
          <div className="px-10">
            <Userthings_valide/>
          </div>
        
      </div>
     
    </div>
   
  );
}
export default Valide_layout;
