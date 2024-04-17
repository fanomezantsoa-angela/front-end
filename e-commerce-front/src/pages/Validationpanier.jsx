import { useState, useEffect, useContext } from "react";
import { CartContext, CartProvider } from "../Hooks/PanierContexte";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

import { validationPayement } from "../Hooks/PayementApi";
import { Button } from "../components/littlecomponent/Button";
import Swal from "sweetalert2";
import Formpayement from "../components/form/Formpayement";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
function Validationpanier() {
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
    navigate("/", { replace: true });
  };
  const Totalmontant = getTotalCost();
  const formData = {
    montant: Totalmontant,
  };
  const validerPayement = async () => {
    // Make validerPayement an async function
    try {
      console.log(formData);
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
    } catch (error) {
      console.error("Validation Payment Error:", error);
      // Handle error if necessary
    }
  };
  return (
    <div>
      <button onClick={retour}>retour</button>

      {items.map((item, id) => (
        <ul key={id}>
          <li>{id + 1}</li>

          <li>{item.name}</li>
          <li className="d-flex justify-content-between">
            <button
              onClick={() => removeOneItemFromCart(item.id)}
              className="px-1 text-center align-middle"
            >
              -
            </button>

            <span className="p-2 bg-light">{item.quantity}</span>
            <IconButton
              variant="info"
              onClick={() => addOneItemToCart(item.id)}
              disabled={item.quantity >= item.stock}
              className="px-1 text-center align-middle"
            >
              +
            </IconButton>
          </li>
          <li>Prix: unitaire {item.price} Ar</li>
          <li>Total {item.quantity * item.price}</li>
          <button onClick={() => deleteItemFromCart(item.id)}>X</button>
        </ul>
      ))}
      <p>Total: $ {getTotalCost()}</p>
      <Button
        action="Effectuer-payement"
        classname="commander_produits"
        buttonhandle={validerPayement}
      />
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
  );
}
export default Validationpanier;
