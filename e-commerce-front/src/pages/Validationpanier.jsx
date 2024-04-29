import { useState, useEffect, useContext } from "react";
import { CartContext, CartProvider } from "../Hooks/PanierContexte";
import { useNavigate } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import { TiDelete } from "react-icons/ti";
import { AiFillMinusCircle } from "react-icons/ai";

import { IoIosAddCircle } from "react-icons/io";
import { IoArrowBackCircle } from "react-icons/io5";
import { validationPayement } from "../Hooks/PayementApi";
import { Button } from "../components/littlecomponent/Button";
import Swal from "sweetalert2";
import Formpayement from "../components/form/Formpayement";
import { AuthContext} from "../Hooks/Auth";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
function Validationpanier() {
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
  const retour = () => {
    navigate("/");
  };
  const Totalmontant = getTotalCost();
  const formData = {
    montant: Totalmontant,
  };
  const validerPayement = async () => {

      if(Totalmontant !== 0){
        const responseData = await validationPayement(formData);
        console.log(responseData);
        if (responseData.status == 200) {
          openpayement();
        } else {
          Swal.fire({
            title: "Erreur",
            text: "Il y a une erreur, veuillez vérifier votre solde",
            icon: "error",
            confirmButtonText: "Oui",
          });
        }
      }
      else {
          Swal.fire({
            title: "Erreur",
            text: "votre panier est vide, Ajoutez au moins un produit ",
            icon: "error",
            confirmButtonText: "Oui",
          });
    }
    
   
  };
  return (
    <div class="">
      <IconButton onClick={retour} className="ml-[2%] mt-[2%] fixed"><IoArrowBackCircle  color="black" size={50}/></IconButton>
               <img src="./src/assets/shop.gif" className="w-[500px] ml-[5%]" />

     <div style={{ backgroundColor: "white" }} className="h-[00%]	w-[51%] ml-[48%]  mt-[-30%] rounded-[20px] pt-[1%] pb-[1%] border-solid border-[5px]	"> 
     <h2 className="text-center text-[30px] text-[black] font-extrabold m-[5%]  mb-[2%]mt-[-2%] ">Mon panier</h2>
     {items.map((item, id) => (
        <ul key={id} className="mt-[5%] ml-[2%] flex flex-row w-[100%] justify-around mb-[5%] border-t-none border-solid border-b-[3px]	 text-center text-[15px] text-[black] font-extrabold">
          <li>{id + 1}</li>

          <li>{item.name}</li>
          <li className="">
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
          <IconButton onClick={() => deleteItemFromCart(item.id)} className=" mt-[-5%]"><TiDelete size={30} color="Red"/></IconButton>
        </ul>
      ))}
      <p className=" text-center text-[black] font-extrabold text-[18px] ml-[68%]">Total: $ {getTotalCost()}</p>
      <div  className=" mb-[2%] border-solid border-2 border-sky-500 rounded-full w-[25%] bg-sky-500/50 ml-[40%] text-center text-[black] font-extrabold text-[18px]  ">
      <Button 
        action="Effectuer-payement"
        classname="commander_produits"
        buttonhandle={validerPayement}
      />
      </div>
      <Modal
        open={payement}
        onClose={closepayement}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="bg-gray-300">
          <Button
            action={<img src="./src/assets/fermer.svg" alt="" />}
            buttonhandle={closepayement}
            classname="fermer"
          />

          <Formpayement closeform={closepayement} />
        </Box>
      </Modal>
      </div>
    </div>
  );
}
export default Validationpanier;
