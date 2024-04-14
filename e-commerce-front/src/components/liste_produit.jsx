import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../Hooks/PanierContexte";
function Liste_produit() {
  

  const { addToCart } = useContext(CartContext);

  const products = [
    {
      id: 1,
      name: "Malm",
      price: 9900,
      quantity: 1,
    },
    {
      id: 2,
      name: "Nordli",
      price: 16500,
      quantity: 5,
    },
    {
      id: 3,
      name: "Kullen",
      price: 4500,
      quantity: 1,
    },
  ];

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <p className="nom-produit">{product.id}</p>
          <p className="nom-produit">{product.name}</p>

          <p className="price">{product.price} Ar</p>
          <button
            onClick={() =>
              addToCart(product.id, product.quantity, product.price, product.name)
            }
          >
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
}
export default Liste_produit;
