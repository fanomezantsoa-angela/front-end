import { Product_list, Product_rating } from "../Hooks/productAPI";
import { useState, useEffect, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { CartContext } from "../Hooks/PanierContexte";
import "./produits_list.css";
function Products_list() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  //const [quantite, setQuantite] = useState(1);
  const [value, setValue] = useState(0);
  const [ratedProducts, setRatedProducts] = useState([]);
  const sendingRate = async (newvalue, id) => {
     if (ratedProducts.includes(id)) {
       return;
     }
      setValue(newvalue);
      console.log(value);
      console.log(id);
      const response = await Product_rating(id, {
        rate_value: value,
      });
    if (response.status == 201) {
      console.log(response.data);
    }
    else {
      console.log(response)
    }
      setRatedProducts([...ratedProducts, id]);
   
  };

 
 
  useEffect(() => {
    async function fetchTypeList() {
     
        const list_product = await Product_list();

        setProducts(list_product.results);
    
    }
    fetchTypeList();
  }, []);
  return (
    // {products.map((product) => (
    <div className="produits flex flex-row justify-around">
      {products.map((product) => (
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
          <Rating
            name="size-small"
            size="small"
            value={value}
            onChange={(event, newValue) => {
              sendingRate(newValue, product.id);
            }}
          />


       
            <p className="nom-produit">{product.name}</p>
            <p className="desciption">
              {product.description} stock: {product.stock}
            </p>
            <p className="price">{product.price} Ar</p>

            <section className="faire-panier">
            

              
              <IconButton
                type="button"
               
                aria-label="faire-panier"
                onClick={() =>
                  addToCart(
                    product.id,
                     1,
                    product.price,
                    product.name,
                    product.stock
                  )
                }
              >
                Ajouter au panier
              </IconButton>
            </section>
          </div>
        ))}
      </div>
    );



}
export default Products_list;
