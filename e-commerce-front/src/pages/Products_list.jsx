import {
  Product_list,
  Product_rating,
  Product_search,
} from "../Hooks/productAPI";
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

import { useState, useEffect, useContext } from "react";
import { SearchproductContext } from "../Hooks/SearchContext";
import Rating from "@mui/material/Rating";
import { CartContext } from "../Hooks/PanierContexte";
import { Product_typesContext } from "../Hooks/Product_typesContext";
import { jwtDecode } from "jwt-decode";
import SeeMoreComponent from "../components/MoreList/SeeMoreComponent";

// For slide utilities
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { Pagination, Navigation } from "swiper/modules"

function Products_list() {
  const { searchedproduct } = useContext(SearchproductContext);
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
   const [quantities, setQuantities] = useState({});
 const [value, setValue] = useState(0);
  //context qui facilite l'accessibilité des données entre lee deux composants
    const [selectedType, setSelectedType] =useContext(Product_typesContext);
  const [ratedProducts, setRatedProducts] = useState([]);
  let miniArray = [1,2,3,2,2,2,21,1,1,1,1]
	const [counter, setCounter] = useState(miniArray)

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


  const sayHello = () => {
	setCounter(miniArray.push(1))
  }

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
		'320': {
			slidesPerView: 2,
			spaceBetween: 20,
		},
		'480': {
			slidesPerView: 3,
			spaceBetween: 30,
		},
		'640': {
			slidesPerView: 4,
			spaceBetween: 30,
		},
		'940': {
			slidesPerView: 5,
			spaceBetween: 50
		},
		'1480': {
			slidesPerView: 6,
			spaceBetween: 50
		}

	}}
	modules={[Navigation, Pagination]}
	className="produits space-x-16 px-10"
	>
        {counter.map((product, index) => ( 
		<SwiperSlide key={index}  className="bg-white rounded-lg 
		lg:w-[15%] md:w-[20%] sm:w-[30%] xs:w-[30%]
		mb-10 scale-90">

			
			<div className="flex flex-col items-center justify-center">

				{/* Image section */}
				<div className="w-[90%] mx-auto mt-4 border border-slate-200 rounded mb-4">
					<img
						src="./src/assets/yaourt-nature.jpg"
						alt="product images"
						className="produit-img"
					/>
				</div>

				{/* Divider */}
				<div className="w-full border-t border-slate-200 mb-6"></div>
				
				{/* Product information section */}
				<div className="px-6 space-y-2 w-full">
					{/* Product name section */}
					<div className="text-left">
						<p className="text-sky-700 font-semibold">Nice and natural product</p>
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
						<span className="text-emerald-700">1000.00 </span> <span className="text-sky-700">Ar</span>
					</p>

					{/* Command section */}
					<section className="w-full flex justify-center items-center">

						<button 
						className="flex flex-row justify-center items-center
						w-full text-white bg-sky-700 hover:bg-sky-600 duration-100
						rounded p-2 mb-4
						"
						onClick={sayHello}>
							<AddShoppingCartOutlinedIcon className=""/>
							<span className="px-2 ubuntu-regular">
								Ajouter au panier
							</span>

						</button>
					</section>
				</div>
			</div>
			
		</SwiperSlide>

        ))}


		{(counter.length > 10) && (
		<SwiperSlide className="bg-white rounded-lg 
		lg:w-[15%] md:w-[20%] sm:w-[30%] xs:w-[30%]
		mb-10 scale-90 mt-28">

			<SeeMoreComponent />
        </SwiperSlide>

		)}
		

    </Swiper>
  );

}
export default Products_list;
