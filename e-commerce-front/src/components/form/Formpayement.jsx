import { Forminput } from "../littlecomponent/Forminput";
import { Formulaire } from "../littlecomponent/Formulaire";
import { Inputhandler } from "../../Hooks/Inputhandler";
import { Button } from "../littlecomponent/Button";
import { AuthContext } from "../../Hooks/Auth";
import { LoadingContext } from "../../Hooks/LoadingContext";
import { useState, useEffect, useContext } from "react";
import {
  creationpurchase,
  creationorders,
  validationPayement,
} from "../../Hooks/PayementApi";
import { CartContext } from "../../Hooks/PanierContexte";
import Swal from "sweetalert2";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
function Formpayement({ closeform}) {
  const { loading, startLoading, stopLoading } = useContext(LoadingContext);
    const { items, emptyCart, getTotalCost } = useContext(CartContext);
       const { IsLoggedIn } = useContext(AuthContext);
  const [adress, setAdresse, adresschange] = Inputhandler("");
    const [account_number, setAccount_number, numcomptechange] = Inputhandler("");
     const [payement_mode, setPayement_mode] = useState("");
    function handleChange(e) {
     setPayement_mode(e.target.value);
    }
  const formData = {
    address: adress,
    payement_mode: payement_mode,
    account_number: account_number,
  };
    
   
  const resetform = () => {
    setAdresse("");
    setAccount_number("");
    setNumcompte("");
  };
  const Totalmontant = getTotalCost();
  const montant = {
    montant: Totalmontant,
  };

  const paymentsubmit =  async (e) => {
   
    e.preventDefault();
    startLoading();
    
         
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
                 const responseData = await validationPayement(montant);
                console.log(responseData);
                closeform();
                setTimeout(3000)
                if (responseData.status == 200) {
              Swal.fire({
            title: "Information",
            text: "Votre payement a été effectué",
            icon: "success",
            confirmButtonText: "Oui",
              });
            
              emptyCart();
          }

               
          } else if (responseorder.status == 500) {
            closepayement();
            setTimeout(3000)
                 Swal.fire({
                   title: "Erreur",
                   text: "une erreur est survenue pendant le payement ",
                   icon: "error",
                   confirmButtonText: "Oui",
                 });
          } else {
            closepayement();
            setTimeout(3000)
               Swal.fire({
                 title: "Erreur",
                 text: "une erreur est survenue pendant le payement, veuillez verifier votre solde ",
                 icon: "error",
                 confirmButtonText: "Oui",
               });
          } 
        }else{
          closepayement();
          setTimeout(3000)
          Swal.fire({
            title: "Erreur",
            text: "veuillez verifier les données que vous avez saisi",
            icon: "error",
            confirmButtonText: "Oui",
          });
          stopLoading()

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
        <Button action= {
              loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    color: "#FFFFFF",
                  }}
                >
                  <CircularProgress
                    sx={{
                      color: "gray",
                    }}
                  />
                </Box>
              ) : (
              "Payer"
              )
            } buttonhandle={paymentsubmit} classname="login" />
      </Formulaire>
    </div>
  );
}
export default Formpayement;
