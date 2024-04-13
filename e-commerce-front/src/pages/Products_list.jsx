import { Product_list } from "../Hooks/productAPI";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import "./produits_list.css"
function Products_list() {
  const [products, setProducts] = useState([]);
  const [quantite, setQuantite] = useState(1);
   const quantitechange= (e) => {
   setQuantite(e.target.value);
   };
  const moins_quantite = (e) => {
    if (quantite > 1) {
      setQuantite(quantite - 1);
    }
  };
  const plus_quantite = (e) => {
  
      setQuantite(quantite + 1);
    
  };
     useEffect(() => {
       async function fetchTypeList() {
         try {
           const list_product = await Product_list();

           setProducts(list_product.results);
           console.log(list_product.results);
         } catch (error) {
           console.error("Error fetching type list:", error);
         }
       }
       fetchTypeList();
     }, []);
    return (
      <div className="produits">
        {products.map((product) => (
          <div key={product.id} className="produit">
            <img
              src="./src/assets/yaourt-nature.jpg"
              alt=""
              className="produit-img"
            />
            <p className="nom-produit">{product.name}</p>
            <p className="desciption">{product.description}</p>
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
                onClick={plus_quantite}
              >
                <img src="./src/assets/plus.svg" alt="" />
              </IconButton>
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="faire-panier"
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