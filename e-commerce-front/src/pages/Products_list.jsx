import { Product_list } from "../Hooks/productAPI";
import { useState, useEffect, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { CartContext } from "../Hooks/PanierContexte";
import "./produits_list.css"
function Products_list() {
  
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [quantite, setQuantite] = useState(1);
   const quantitechange= (e) => {
   setQuantite(e.target.value);
   };
  const moins_quantite = () => {
    if (quantite > 1) {
      setQuantite(quantite - 1);
    }
  };
  const plus_quantite = (stock) => {
    // Ensure valid arguments (optional, can be added for robustness)
    if (typeof stock !== "number") {
      console.error(
        "plus_quantite: Invalid argument. Expected a number for stock."
      );
      return;
    }

    const updatedQuantite = Math.min(quantite + 1, stock);
    setQuantite(updatedQuantite);
  };
     useEffect(() => {
       async function fetchTypeList() {
         try {
           const list_product = await Product_list();

           setProducts(list_product.results);
        
         } catch (error) {
           console.error("Error fetching type list:", error);
         }
       }
       fetchTypeList();
     }, []);
    return (
        // {products.map((product) => (
      <div className="produits flex flex-row justify-around">
        {[1,2,3].map((product) => (
          <div key={product.id} className="produit">
            <img
              src="./src/assets/yaourt-nature.jpg"
              alt=""
              className="produit-img"
            />
            <p className="nom-produit">{product.name}</p>
            <p className="desciption">
              {product.description} stock: {product.stock}
            </p>
            <p className="price">{product.price} Ar</p>
            <section className="faire-panier">
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="moins-quantite"
                onClick={moins_quantite}
              >
                <img src="./src/assets/moins.svg" alt="" />
              </IconButton>
              <TextField
                value={quantite}
                variant="standard"
                onChange={quantitechange}
              />
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="plus-quantite"
                disabled={quantite >= product.stock} 
                onClick={() => plus_quantite(product.stock)}
              >
                <img src="./src/assets/plus.svg" alt="" />
              </IconButton>
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="faire-panier"
                onClick={() =>
                  addToCart(
                    product.id,
                    quantite,
                    product.price,
                    product.name,
                    product.stock
                  )
                }
              >
                <img src="./src/assets/panier1.svg" alt="" />
              </IconButton>
            </section>
          </div>
        ))}
      </div>
    );


}
export default Products_list;