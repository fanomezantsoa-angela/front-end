//landing page(acceuil)
import { Button } from "../littlecomponent/Button";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../Hooks/PanierContexte";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
import { AiFillMinusCircle } from "react-icons/ai";


import { IoIosAddCircle } from "react-icons/io";


function Paniers({ panierClose }) {
  const navigate = useNavigate();
 
    const {
      items,
      addOneItemToCart,
      removeOneItemFromCart,
      deleteItemFromCart,
      getTotalCost,
    } = useContext(CartContext);
    const validerpanier= () => {
      panierClose();


       navigate("/Validerpanier");

  };
  return (
    <div style={{ backgroundColor: "white" }} class="	w-[50%] ml-[49%]  mt-[9%] rounded-[20px] pt-[1%] pb-[1%] "  >
      <h2 class="text-center text-lg text-[black] font-extrabold 
          ">Liste des produits dans votres panier</h2>
      <div class="mt-[5%] ml-[5%]" >
      <table class="size-full  border-collapse none text-left 	">
        <thead class="text-base text-[black] font-extrabold " >
          <tr >
            <th>Numéro</th>

            <th>Nom du produit</th>
            <th >Quantité</th>
            <th>  Prix unitaire</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody class="mb-[5%]">
          {items.map((item, id) => (
            <tr key={id} class="border-t-none border-solid border-b-[3px]	mb-[5%]">
              <td>{id + 1}</td>

              <td>{item.name}</td>
              <td className="d-flex justify-content-between " >
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
              </td> 
              <td>{item.price} Ar</td>
              <td> {item.quantity * item.price} Ar</td>
              <IconButton onClick={() => deleteItemFromCart(item.id)}>
              <TiDelete size={35} color="red" />

              </IconButton>
            </tr>
          ))}
          <tr class="text-base text-[black] font-extrabold">
            <td colSpan="5" className="text-end ">
              Total: {getTotalCost()} Ar
            </td>
          </tr>
        </tbody>
      </table>
      </div>

      <div class=" mb-[2%] border-solid border-2 border-sky-500 rounded-full w-[20%] bg-sky-500/50 ml-[40%] text-center text-[black] font-extrabold text-[18px]  mt-[2%]">
        <Button
          action="Commander"
          
          buttonhandle={validerpanier}
        
        />
      </div>


    </div>
  );
}
export default Paniers;