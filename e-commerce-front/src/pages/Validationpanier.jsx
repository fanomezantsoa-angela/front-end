import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Form_payement from "../components/form/form_payement";

import Valide_layout from "../components/headerComponent/Valide_layout";
// import Layout from "../components/headerComponent/Layout";
import { AuthContext} from "../Hooks/Auth";

import Panier_valide from "../components/PanierComponent/Panier_valide";
// import MonPanier from "./MonPanier";
// import Paniers from "../components/PanierComponent/Paniers";
import FirstFooterSectionComponent from "../components/footer/FIrstFooterSectionComponent"
import SecondFooterSectionComponent from "../components/footer/SecondFooterSectionComponent";

function Validationpanier() {

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
<Form_payement className="w-20"/>    

</div>
<Panier_valide  className="  h-[100vh] ml-" />

      </div>
      <FirstFooterSectionComponent/>
      <SecondFooterSectionComponent/>
    </div>
  );
}
export default Validationpanier;
