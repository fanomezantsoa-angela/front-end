import { Button } from "../littlecomponent/Button";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../Hooks/PanierContexte";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
import { AiFillMinusCircle } from "react-icons/ai";
import Swal from "sweetalert2";
import { IoIosAddCircle } from "react-icons/io";
function Paniers({ panierClose }) {
  const [quantity, setQuantity] = useState("")
  const navigate = useNavigate();
   const {
     items,
     addToCart,
      addOneItemToCart,
      removeOneItemFromCart,
      deleteItemFromCart,
      getTotalCost,
    } = useContext(CartContext);
     
   
    const validerpanier= () => {
      panierClose();

         if (!(localStorage.getItem("token")) ) {
           Swal.fire({
             title: "il est nécessaire de se connecter",
             text: "i est nécessaire de se connnecter pour commandes le(s) peoduit(s). Voules-vous se connecter?",
             icon: "warning",
             showCancelButton: true,
             confirmButtonText: "Oui",
             cancelButtonText: "Annuler",
           }).then((result) => {
             if (result.value) {
               // User clicked 'Yes, log in'
               const returnURL = "/Validerpanier";
               navigate(`/login?returnURL=${encodeURIComponent(returnURL)}`);
             }
           });
         } else if(items.length == 0){
          Swal.fire({
            title: "Panier vide",
            text: "Veuillez ajouter au moins un produit dans le panier",
            icon: "warning",
            
            confirmButtonText: "Oui",
           
          })

         } else{
           // Proceed with payment since token is available
           navigate("/Validerpanier");
         }
  };

      

  
  return (
    <div
      style={{ backgroundColor: "white" }}
      className="	w-[40%] ml-[60%] h-[200%] mt-[0%] rounded-[20px] pt-[10%] pb-[10%] "
    >
      {/* <img src="./src/assets/shop.gif" class="w-[80px]" /> */}

      <h2
        className="text-center text-lg text-[black] font-extrabold mt-[-18%]
          "
      >
        Liste des produits dans votres panier
      </h2>
      <div className="mt-[5%] ml-[5%]">
        <table className="size-full  border-collapse none text-left 	">
          <thead className="text-base text-[black] font-extrabold ">
            <tr>
              <th>Numéro</th>

              <th>Nom du produit</th>
              <th>Quantité</th>
              <th> Prix unitaire</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody className="mb-[5%]">
            {items.map((item, id) => (
              <tr
                key={id}
                className="border-t-none border-solid border-b-[3px]	mb-[5%]"
              >
                <td>{id + 1}</td>

                <td>{item.name}</td>
                <td className="d-flex justify-content-between ">
                  <IconButton
                    onClick={() => removeOneItemFromCart(item.id)}
                    className="px-1 text-center align-middle"
                  >
                    <AiFillMinusCircle size={20} color="#0061A8" />
                  </IconButton>

                  <span> {item.quantity}</span>

                  <IconButton
                    variant="info"
                    onClick={() => addOneItemToCart(item.id)}
                    disabled={item.quantity >= item.stock}
                    className="px-1 text-center align-middle"
                  >
                    <IoIosAddCircle size={20} color="#0061A8" />
                  </IconButton>
                </td>
                <td>{item.price} Ar</td>
                <td> {item.quantity * item.price} Ar</td>
                <IconButton onClick={() => deleteItemFromCart(item.id)}>
                  <TiDelete size={35} color="red" />
                </IconButton>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-base text-[black] font-extrabold mt-[2%] mr-[8%]">
        <p className="text-end ">Total: {getTotalCost()} Ar</p>
      </div>
      {/* <img src="./src/assets/click.gif" className="pi" /> */}
      <div className="mx-auto flex flex-row items-center justify-center">
        {/* <div></div> */}
        <Button
          action="COMMANDER"
          classname="bg-sky-700 text-white px-8 p-2 rounded-md
          hover:bg-sky-600 ease-in-out duration-75"
          buttonhandle={validerpanier}
        />
      </div>
    </div>
  );
}
export default Paniers;