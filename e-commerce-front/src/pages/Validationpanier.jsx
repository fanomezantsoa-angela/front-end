import { useState, useEffect, useContext } from "react";
import { CartContext } from "../Hooks/PanierContexte";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
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
     const retour= () => {
     
       navigate("/", { replace: true });
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
          buttonhandle={openpayement}
        />
     
      </div>
    );
}
export default Validationpanier;