import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { IoArrowBackCircle } from "react-icons/io5";
import Form_payement from "../components/form/form_payement";
import { AuthContext} from "../Hooks/Auth";
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
