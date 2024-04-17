import { Forminput } from "../littlecomponent/Forminput";
import { Formulaire } from "../littlecomponent/Formulaire";
import { Inputhandler } from "../Hooks/Inputhandler";
import { Button } from "../littlecomponent/Button";
import { useState, useEffect, useContext } from "react";
import { creationpurchase } from "../Hooks/PayementApi";
import { creationorders } from "../Hooks/PayementApi";
import { CartContext } from "../Hooks/PanierContexte";
import Swal from "sweetalert2";
function Formpayement({ closepayement}) {
    const { items } = useContext(CartContext);
    
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

  const paymentsubmit = async (e) => {
    e.preventDefault();
      try {
         
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
           try {
             const responseorder = await creationorders(formorder);
             if (responseorder.status == 201) {
               console.log(responseorder);
               Swal.fire({
                 title: "Information",
                 text: "Votre payement a été effectué",
                 icon: "success",
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
           } catch (error) {
             console.error("order error:", error);
             // Handle error if necessary
           }
        }
      } catch (error) {
        console.error("payement error:", error);
        
      }
  

      
   
  };
  return (
    <div>
      <Formulaire classname="login-form">
        <input
          type="radio"
          name="payment" // Same name for all radio buttons in the group
          value="visa"
          onChange={handleChange}
        />
        Visa
        <br />
        <input
          type="radio"
          name="payment" // Same name for all radio buttons in the group
          value="mastercard"
          onChange={handleChange}
        />
        Mastercard
        <Forminput
          typeinput="text"
          nomlabel="Adresse"
          value={adress}
          inputchange={adresschange}
        />
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
