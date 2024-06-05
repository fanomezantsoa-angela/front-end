import { useState, useEffect, useContext } from "react";
// import { CartContext, CartProvider } from "../Hooks/PanierContexte";
import { useNavigate } from "react-router-dom";
import Panier from "../components/PanierComponent/Panier";
import IconButton from "@mui/material/IconButton";
import { TiDelete } from "react-icons/ti";
import { AiFillMinusCircle } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { IoArrowBackCircle } from "react-icons/io5";
import { validationPayement } from "../Hooks/PayementApi";
import { Button } from "../components/littlecomponent/Button";
import Form_payement from "../components/form/form_payement";
import Swal from "sweetalert2";
import CreditCardForm from "../components/form/form_payement";
import Drawer from "@mui/material/Drawer";
import Valide_layout from "../components/headerComponent/Valide_layout";
// import Layout from "../components/headerComponent/Layout";
import { AuthContext} from "../Hooks/Auth";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Panier_valide from "../components/PanierComponent/Panier_valide";
// import MonPanier from "./MonPanier";
// import Paniers from "../components/PanierComponent/Paniers";
import FirstFooterSectionComponent from "../components/footer/FIrstFooterSectionComponent"
import SecondFooterSectionComponent from "../components/footer/SecondFooterSectionComponent";
function Validationpanier() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  // const [payement, setPayment] = useState(false);
  // const openpayement = () => setPayment(true);
  // const closepayement = () => setPayment(false);
  const navigate = useNavigate();
  // const {
  //   items,
  //   addOneItemToCart,
  //   removeOneItemFromCart,
  //   deleteItemFromCart,
  //   getTotalCost,
  // } = useContext(CartContext);
  const retour = () => {
    navigate("/");
  };
  // const Totalmontant = getTotalCost();
  // const formData = {
  //   montant: Totalmontant,
  // };
  // const validerPayement = () => {

  //     if(Totalmontant !== 0){
         
  //         openpayement();
  //       }
      
 
    
   
  // };
  return (

    <div >
      <div>
        <Valide_layout/>
      </div>
      <div className="flex justify-between w-full" >

     

{/* <IconButton onClick={retour} className="ml-[2%] mt-[2%] fixed"><IoArrowBackCircle  color="black" size={50}/></IconButton> */}

<div >
{/* <img src="./src/assets/barket.png" className="w-[600px] z-0  mt-[5%] ml-[5%]" /> */}
<CreditCardForm className="w-20"/>    

</div>
<Panier_valide  className="  h-[100vh] ml-" />

      </div>
      <FirstFooterSectionComponent/>
      <SecondFooterSectionComponent/>
    </div>
  );
}
export default Validationpanier;
