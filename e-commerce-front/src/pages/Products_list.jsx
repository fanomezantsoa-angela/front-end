import {
  Product_list,
  Product_rating,
  Product_search,
} from "../Hooks/productAPI";
import { useState, useEffect, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import { SearchproductContext } from "../Hooks/SearchContext";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { CartContext } from "../Hooks/PanierContexte";
import { Product_typesContext } from "../Hooks/Product_typesContext";
import "./produits_list.css";
function Products_list() {
  const { searchedproduct } = useContext(SearchproductContext);
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [quantite, setQuantite] = useState(1);
  const [value, setValue] = useState(0);
  //context qui facilite l'accessibilité des données entre lee deux composants
    const [selectedType, setSelectedType] =useContext(Product_typesContext);
  const [ratedProducts, setRatedProducts] = useState([]);
  //filtre le produit par tout les produit ou par type de produit cliqué(id produit cliqué exite dans les produits )
  const filteredProducts = selectedType
    ? products.filter(
        (product) => product.type === selectedType
      )
    : products;
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
   console.log("Selected Type:", selectedType);
 }, [selectedType]);
 
  useEffect(() => {
    async function fetchTypeList() {
    
        const list_product = await Product_list();

        setProducts(list_product.results);
      
    }
    fetchTypeList();
  }, [searchedproduct]);

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
    <div className="produits flex flex-row justify-around">
      {filteredProducts &&
        filteredProducts.map((product) => (
          <div key={product.id} className="produit">
            <img
              src="./src/assets/yaourt-nature.jpg"
              alt=""
              className="produit-img"
            />
            <p className="nom-produit">{product.name}</p>
            <p className="desciption">
              {product.description} stock: {product.type}
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
