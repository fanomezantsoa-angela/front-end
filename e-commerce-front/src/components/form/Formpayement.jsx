import { Forminput } from "../littlecomponent/Forminput";
import { Formulaire } from "../littlecomponent/Formulaire";
import { Inputhandler } from "../../Hooks/Inputhandler";
import { Button } from "../littlecomponent/Button";
import { AuthContext } from "../../Hooks/Auth";
import { useState, useEffect, useContext } from "react";
import { creationpurchase, creationorders } from "../../Hooks/PayementApi";
import { CartContext } from "../../Hooks/PanierContexte";
import Swal from "sweetalert2";
function Formpayement({ closepayement}) {
    const { items, emptyCart } = useContext(CartContext);
       const { IsLoggedIn } = useContext(AuthContext);
  const [adress, setAdresse, adresschange] = Inputhandler("");
    const [account_number, setAccount_number, numcomptechange] = Inputhandler("");
     const [payement_mode, setPayement_mode] = useState("");
    function handleChange(e) {
     setPayement_mode(e.target.value);
    }
  const formData = {
    adress: adress,
    payement_mode: payement_mode,
    account_number: account_number,
  };
    
   
  const resetform = () => {
    setAdresse("");
    setAccount_number("");
    setNumcompte("");
  };

  const paymentsubmit =  async (e) => {
   
    e.preventDefault();
    
         
        const responseData = await creationpurchase(formData);
       
        if (responseData.status == 201) {
            const formorder = {
              purchaseId: responseData.data.id,
              indexes: (function () {
                
                const indexes = [];
                let index = 1; 
                for (const key in items) {
                  indexes.push(index);
                  index++;
                }
                return indexes;
              })(),
              orders: items.map((item) => ({
                purchase: responseData.data.id,
                product: item.id,
                quantity: item.quantity,
              })),
            };
          console.log(formorder);
          
             const responseorder =  await creationorders(formorder);
             if (responseorder.status == 201) {
               
               console.log(responseorder);

               Swal.fire({
                 title: "Information",
                 text: "Votre payement a été effectué",
                 icon: "success",
                 confirmButtonText: "Oui",
               });
               closepayement();
               emptyCart();
             } else if (responseorder.status == 500) {
                 Swal.fire({
                   title: "Erreur 500",
                   text: "une erreur 500 est survenue pendant le payement ",
                   icon: "error",
                   confirmButtonText: "Oui",
                 });
             } else {
               Swal.fire({
                 title: "Erreur",
                 text: "une erreur est survenue pendant le payement ",
                 icon: "error",
                 confirmButtonText: "Oui",
               });
             } 
          
        }
    

      
   
  };
  return (
    <div>
      <Formulaire classname="bg-gray-300">
        Visa
        <input
          type="radio"
          name="payment" // Same name for all radio buttons in the group
          value="visa"
          onChange={handleChange}
        />
        <br />
        Mastercard
        <input
          type="radio"
          name="payment" // Same name for all radio buttons in the group
          value="mastercard"
          onChange={handleChange}
        />{" "}
        <br />
        <Forminput
          typeinput="text"
          nomlabel="Adresse"
          value={adress}
          inputchange={adresschange}
        />
        <br />
        <Forminput
          typeinput="text"
          nomlabel="numero de compte"
          value={account_number}
          inputchange={numcomptechange}
        />
        <Button action="Payer" buttonhandle={paymentsubmit} classname="login" />
      </Formulaire>
    </div>
  );
}
export default Formpayement;
