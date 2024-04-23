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
import { jwtDecode } from "jwt-decode";
function Products_list() {
  const { searchedproduct } = useContext(SearchproductContext);
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
   const [quantities, setQuantities] = useState({});
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
    const sendingRate = async (newValue, id) => {
      if (!ratedProducts.includes(id)) {
        setRatedProducts([...ratedProducts, id]);
        setValue(newValue);
        const response = await Product_rating(id, { rate_value: newValue });
        if (response.status === 201) {
          console.log(response.data);
        } else {
          console.log(response);
        }
      }
    };

 useEffect(() => {
   console.log("Selected Type:", selectedType);
 }, [selectedType]);
 
  useEffect(() => {
    async function fetchProducts() {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);

      console.log(decoded);
      const response = await Product_list();
      setProducts(response.results);
      const initialQuantities = {};
      response.results.forEach((product) => {
        initialQuantities[product.id] = 1;
      });
      setQuantities(initialQuantities);
    }
    fetchProducts();
  }, []);

  const handleQuantityChange = (id, increment) => {
    setQuantities((prevQuantities) => {
      const stock = products.find((product) => product.id === id).stock;
      const currentQuantity = prevQuantities[id];
      const updatedQuantity = increment
        ? Math.min(currentQuantity + 1, stock)
        : Math.max(currentQuantity - 1, 1);
      return { ...prevQuantities, [id]: updatedQuantity };
    });
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
           
           
            <p className="price">{product.price} Ar</p>
            <Rating
              name="size-small"
              size="small"
              value={value}
              onChange={(event, newValue) => sendingRate(newValue, product.id)}
            />

            <p className="nom-produit">{product.name}</p>
           
        

            <section className="faire-panier">
              <IconButton
                type="button"
                aria-label="faire-panier"
                onClick={() =>
                  addToCart(
                    product.id,
                    quantities[product.id],
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
                onClick={() => handleQuantityChange(product.id, false)}
              >
                <img src="./src/assets/moins.svg" alt="" />
              </IconButton>
              <TextField value={quantities[product.id]} variant="standard" />
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="plus-quantite"
                onClick={() => handleQuantityChange(product.id, true)}
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
                    quantities[product.id],
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
