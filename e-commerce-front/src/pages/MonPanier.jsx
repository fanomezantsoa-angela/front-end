import React from 'react'
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../Hooks/PanierContexte";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";

import IconButton from "@mui/material/IconButton";
import { TiDelete } from "react-icons/ti";
import { AiFillMinusCircle } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { IoArrowBackCircle } from "react-icons/io5";
// import { validationPayement } from "../Hooks/PayementApi";
// import { Button } from "../components/littlecomponent/Button";
// import Form_payement from "./form_payement";
import Swal from "sweetalert2";
// import Formpayement from "../components/form/Formpayement";
import { AuthContext} from "../Hooks/Auth";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { MdDeleteForever } from "react-icons/md";

// import NotificationContentComponent from "../components/notification/NotificationContentComponent";


function MonPanier() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [payement, setPayment] = useState(false);
  const openpayement = () => setPayment(true);
  const closepayement = () => setPayment(false);
  const navigate = useNavigate();
  const {
    items,
    addOneItemToCart,
    removeOneItemFromCart,
    deleteItemFromCart,
    getTotalCost,
  } = useContext(CartContext);
//   const retour = () => {
//     navigate("/");
//   };
  const Totalmontant = getTotalCost();
  const formData = {
    montant: Totalmontant,
  };
  const validerPayement = () => {

      if(Totalmontant !== 0){
         
          openpayement();
        }
      
 
    
   
  };
  return (
    <div  className="">

<div >
                <h2 className={["text-center text-3xl tracking-widest text-white w-full p-3 bg-sky-700"]}>
                    Mon panier
                </h2>
            </div>

            <Divider />
<div style={{ backgroundColor: "white" }} class=" p-5"> 


 {items.map((item, id) => (
    <ul key={id} className="mt-[5%]  p-5-[50%] flex flex-row justify-around mb-[5%] border-t-none  border-b [] border-solid border-b-[3px]	 text-left text-[14px] text-[black] font-extrabold">
      {/* <li>{id + 1}</li> */}

      <li>{item.name}</li>
      <li className="mt-[-1%]">
      <IconButton  
          
          onClick={() => removeOneItemFromCart(item.id)}
              className="px-1 text-center align-middle">
                
                <AiFillMinusCircle size={20} color="#0061A8"/>


              </IconButton>

        <span className="p-2 bg-light">{item.quantity}</span>
        <IconButton
          variant="info"
          onClick={() => addOneItemToCart(item.id)}
          disabled={item.quantity >= item.stock}
          className="px-1 text-center align-middle"
        >
                           <IoIosAddCircle size={20}  color="#0061A8"/>

        </IconButton> 
      </li>
      <li>Prix unitaire: {item.price} Ar</li>
      <li>Total {item.quantity * item.price}</li>
      <li className="mt-[-4%] "> <IconButton onClick={() => deleteItemFromCart(item.id)} ><TiDelete size={20} color="Red"/></IconButton></li>
    </ul>
  ))}

  <p className=" text-center text-[black] font-extrabold text-[18px] ml-[68%] mt-[5%]">Total: {getTotalCost()} Ar</p>
  <div  className="w-full flex justify-center">
     

  </div>
  
  </div>
        
    </div>
  )
}

export default MonPanier