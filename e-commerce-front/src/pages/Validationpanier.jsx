import { useState, useEffect, useContext } from "react";
// import { CartContext, CartProvider } from "../Hooks/PanierContexte";
import { useNavigate } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import { TiDelete } from "react-icons/ti";
import { AiFillMinusCircle } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { IoArrowBackCircle } from "react-icons/io5";
import { validationPayement } from "../Hooks/PayementApi";
import { Button } from "../components/littlecomponent/Button";
import Form_payement from "./form_payement";
import Swal from "sweetalert2";
import Formpayement from "../components/form/Formpayement";
import { AuthContext} from "../Hooks/Auth";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import MonPanier from "./MonPanier";

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


      <IconButton onClick={retour} className="ml-[2%] mt-[2%] fixed"><IoArrowBackCircle  color="black" size={50}/></IconButton>

    <div >
    <img src="./src/assets/barket.png" className="w-[600px] z-0  mt-[5%] ml-[5%]" />
    <Form_payement/>    

    </div>
   <MonPanier className=""/>
    </div>
  );
}
export default Validationpanier;
