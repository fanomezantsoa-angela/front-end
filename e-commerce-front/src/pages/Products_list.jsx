import {
  Product_list,
  Product_rating,
  Product_search,
} from "../Hooks/productAPI";
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { useState, useEffect, useContext, useReducer } from "react";
import IconButton from "@mui/material/IconButton";
import { SearchproductContext } from "../Hooks/SearchContext";
import Rating from "@mui/material/Rating";
import { CartContext } from "../Hooks/PanierContexte";
import { Product_typesContext } from "../Hooks/Product_typesContext";
import ProductReducer from "../Hooks/ProductReducer"

// import TextField from "@mui/material/TextField";
// import "./produits_list.css";

// For slide utilities
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Pagination, Navigation } from "swiper/modules"
import { type_product } from "../Hooks/API";

function Products_list() {
	const initialstate = { products: [] };
	const [state, dispatch] = useReducer(ProductReducer, initialstate);
	const { products } = state;
  const { productresult } = useContext(SearchproductContext);
  const { addToCart } = useContext(CartContext);
	

   const [quantities, setQuantities] = useState({});
 const [value, setValue] = useState(0);
  //context qui facilite l'accessibilité des données entre lee deux composants
	const { typeproduct} = useContext(Product_typesContext);
  const [ratedProducts, setRatedProducts] = useState([]);

  let miniArray = [1,2,3,2,2,2,21,1,1,1,1]
	const [counter, setCounter] = useState(miniArray)

  //filtre le produit par tout les produit ou par type de produit cliqué(id produit cliqué exite dans les produits )


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
  console.log("Search Results in Products_list:", productresult);
  console.log("Selected Product Types in Products_list:", typeproduct);
  // Dispatching actions based on received context
  if (productresult && productresult.length > 0) {
    dispatch({ type: "SET_PRODUCTS", payload: productresult });
  } else if (typeproduct && typeproduct.length > 0) {
    dispatch({ type: "SET_PRODUCTS", payload: typeproduct });
	}
	  console.log("products actual:", products);
  
}, [productresult, typeproduct, dispatch]);

  useEffect(() => {
    console.log("Direct use of context values:", productresult, typeproduct);
  }, [productresult, typeproduct]);
   useEffect(() => {
     const initialQuantities = {};
     products.forEach((product) => {
       initialQuantities[product.id] = 1;
     });
     setQuantities(initialQuantities);
   }, [products]);


//   const handleQuantityChange = (id, increment) => {
//     setQuantities((prevQuantities) => {
//       const stock = products.find((product) => product.id === id).stock;
//       const currentQuantity = prevQuantities[id];
//       const updatedQuantity = increment
//         ? Math.min(currentQuantity + 1, stock)
//         : Math.max(currentQuantity - 1, 1);
//       return { ...prevQuantities, [id]: updatedQuantity };
//     });
//   };

//   const sayHello = () => {
// 	setCounter(miniArray.push(1))
//   }

  return (
    // {products.map((product) => (

    <Swiper 
	slidesPerView={5}
	spaceBetween={100}
	navigation={true}
	pagination={{
		clickable: true
	}}
	breakpoints={{
		'@0.00': {
			slidesPerView: 5,
			spaceBetween: 10,
		},
		'@0.75': {
			slidesPerView: 5,
			spaceBetween: 20,
		},
		'@1.00': {
			slidesPerView: 5,
			spaceBetween: 40,
		},
		'@1.50': {
			slidesPerView: 5,
			spaceBetween: 50,
		},
	}}
	modules={[Navigation, Pagination]}
	className="produits space-x-16 px-10"
	>
      {products.map((product) => (
		<SwiperSlide key={product.id} className="
			flex flex-col items-start justify-start
			bg-white rounded-lg 
			 lg:w-[15%] md:w-[20%] sm:w-[30%] xs:w-[30%]
			 mb-10
		">
			{/* Product image */}
			<div className="w-[90%] mx-auto mt-4 border border-slate-200 rounded mb-4">
				<img
					src="./src/assets/yaourt-nature.jpg"
					alt=""
					className="produit-img"
				/>
			</div>



			{/* ***** DIvider ***** */}
			<div className="w-full border-t border-slate-200 mb-6"></div>

 
            


			{/* Text section */}
			<div className="px-6 space-y-2 w-full">
				{/* Product name section */}
				<div className="text-left">
					<p className="text-sky-700 font-semibold">{product.name}</p>
				</div>
			

				{/* Rating section */}
				<div className="">
					<Rating
					name="size-small"
					size="medium"
					value={3}
					onChange={(event, newValue) => sendingRate(newValue, product.id)}
					/>
				</div>
			
				{/* Price section */}
				<p className="price ">
					<span className="text-emerald-700">{product.price} </span> <span className="text-sky-700">Ar</span>
				</p>

				{/* Command section */}
				<section className="w-full flex justify-center items-center">

					<button 
					className="flex flex-row justify-center items-center
					w-full text-white bg-sky-700 hover:bg-sky-600 duration-100
					rounded p-2 mb-4
					"
					onClick={() =>
						addToCart(
							product.id,
							quantities[product.id],
							product.price,
							product.name,
							product.stock
						)}>
						<AddShoppingCartOutlinedIcon className=""/>
						<span className="px-2 ubuntu-regular">
							Ajouter au panier
						</span>

					</button>
				</section>
			</div>

          </SwiperSlide>



        ))}
    </Swiper>

    
    

  );

}
export default Products_list;
