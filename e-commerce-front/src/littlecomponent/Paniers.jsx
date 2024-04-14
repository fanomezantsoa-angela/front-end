
import { Button } from "../littlecomponent/Button";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../Hooks/PanierContexte";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
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
       navigate("/Validationpanier", { replace: true });
  };
  return (
    <div style={{ backgroundColor: "white" }}>
      <table>
        <thead>
          <tr>
            <th>#</th>

            <th>Item</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, id) => (
            <tr key={id}>
              <td>{id + 1}</td>

              <td>{item.name}</td>
              <td className="d-flex justify-content-between">
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
              </td>
              <td>$ {item.price}</td>
              <td>$ {item.quantity * item.price}</td>
              <button onClick={() => deleteItemFromCart(item.id)}>X</button>
            </tr>
          ))}
          <tr>
            <td colSpan="5" className="text-end">
              Total: $ {getTotalCost()}
            </td>
          </tr>
        </tbody>
      </table>
      <section>
        <Button
          action="Commander"
          classname="commander_produits"
          buttonhandle={validerpanier}
        />
      </section>
    </div>
  );
}
export default Paniers;