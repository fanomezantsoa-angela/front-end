import { Product_list, Product_rating } from "../Hooks/productAPI";
import { useState, useEffect, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { CartContext } from "../Hooks/PanierContexte";
import { AiFillMinusCircle } from "react-icons/ai";


import { IoIosAddCircle } from "react-icons/io";
import "./produits_list.css";
function Products_list() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [quantite, setQuantite] = useState(1);
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

  const quantitechange = (e) => {
    const value = e.target.value;
    setQuantite(value);
  }

  const moins_quantite = () => {
    if (quantite > 1) {
      setQuantite(quantite - 1);
    }
  };

  const plus_quantite = (stock) => {
    // Ensure valid arguments (optional, can be added for robustness)

    const updatedQuantite = Math.min(quantite + 1, stock);
    setQuantite(updatedQuantite);
  };


  return (
    // {products.map((product) => (
    <div className="produits flex flex-row ml-[6%] w-[80%] mt-[-1%] ">
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
          <p className="price">Prix:{product.price} Ar</p>
         


          {/* <section className="faire-panier">
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

      
      




    
    

          </section> */}


          <section className="faire-panier">
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="moins-quantite"
              onClick={moins_quantite}
            >
                    <AiFillMinusCircle size={20} color="#0061A8"/>
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
                 <IoIosAddCircle size={20}  color="#0061A8"/>
            </IconButton>
           
          </section>

          <IconButton class=" mb-[8%]  border-solid border-2 border-[#0061A8] rounded-full w-[80%] bg-sky-500/50  text-center text-[black] font-extrabold text-[14px]  mt-[8%]"
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
              {/* <img src="./src/assets/panier1.svg" alt="" /> */}
              Ajouter au panier
            </IconButton>
            <Rating 
            name="size-small"
            size="medium"
            value={value}
            onChange={(event, newValue) => {
              sendingRate(newValue, product.id);
            }}
          />
          </div>
        ))}
      </div>
    );



}
export default Products_list;
