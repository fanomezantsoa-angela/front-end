import {
  Product_list,
  Product_rating,
  Product_search,
} from "../Hooks/productAPI";
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack'
import { useState, useEffect, useContext } from "react";
import { SearchproductContext } from "../Hooks/SearchContext";
import Rating from "@mui/material/Rating";
import { CartContext } from "../Hooks/PanierContexte";
import { Product_typesContext } from "../Hooks/Product_typesContext";
import { jwtDecode } from "jwt-decode";
import SeeMoreComponent from "../components/MoreList/SeeMoreComponent";
import { LoadingContext } from "../Hooks/LoadingContext";
// For slide utilities
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { Pagination, Navigation } from "swiper/modules"
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { Skeleton_produit } from "../components/littlecomponent/Skeleton_product";
function Products_list() {
	const [loadingproduct, setLoadingproduct] = useState(true);
	const { productresult } = useContext(SearchproductContext);
	const { addToCart } = useContext(CartContext);
	const [products, setProducts] = useState([]);
	const [quantities, setQuantities] = useState({});
	const [value, setValue] = useState(0);
	//context qui facilite l'accessibilité des données entre lee deux composants
	const {typeproduct, setTypeproduct} = useContext(Product_typesContext);
	const [ratedProducts, setRatedProducts] = useState([]);

	
	
	// Swiper state
	let miniArray = [1,2,3,2,2,2,21,1,1,1,1]
	const [items, setItems] = useState(miniArray)
	const [swiper, setSwiper] = useState(null)

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
		async function fetchProducts() {
			try {
				setLoadingproduct(true);
				console.log("after setting true", loadingproduct);
	
				console.log("Fetching products...");
				console.log("loading fetch", loadingproduct);
	
				let fetchedProducts = [];
	
				if (productresult && productresult.length > 0) {
					console.log("Using searched products:", productresult);
					fetchedProducts = productresult;
					console.log("pendant fetch", loadingproduct);
				} else if (typeproduct && typeproduct.length > 0) {
					console.log("Using type selected products:", typeproduct);
					fetchedProducts = typeproduct;
					console.log("pendant fetch", loadingproduct);
				}
	
				setProducts(fetchedProducts);
				console.log("after setting products", products);
			} catch (error) {
				console.error("Error fetching products:", error);
			} finally{
				setLoadingproduct(false)
			}
			
		}
	
		fetchProducts();
	
	}, [productresult, typeproduct]);

	// useEffect(() => {
	// 	console.log("Products to render:", products);
	// }, [products]);

   useEffect(() => {
     const initialQuantities = {};
     products.forEach((product) => {
       initialQuantities[product.id] = 1;
     });
     setQuantities(initialQuantities);
   }, [products]);



   /**
	* 
	* Handle swiper update
	*
	*/
	useEffect(() => {
		if (swiper) {
			swiper.updateAutoHeight()
		}
	}, [items, swiper] )
	
	// Update the list of items to be used by the swipepr after fetching
	const addFurtherItemsAfterFetch = () => {
		// Fetch logic goes here .....
		
		
		//Replace items.lemgth+1 by data fetched 
		setItems([...items, items.length+1])
	}


	const hanldePropsEvent = () => {
		addFurtherItemsAfterFetch()
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
	
        {loadingproduct ? (
        <Skeleton_produit />
      )  :
		
        products.length > 0 && products.map((product, index) => ( 
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
						<p className="text-sky-700 font-semibold">{ product.name }</p>
					</div>
				
				

					{/* Rating section */}
					
						<Rating
						name="size-small"
						size="medium"
						value={3}
						onChange={(event, newValue) => sendingRate(newValue, product.id)}
						/>
					</div>  
					
				
					{/* Price section */}
					<p className="price ">
						<span className="text-emerald-700">{ product.price } </span> <span className="text-sky-700">Ar</span>
					</p> 
					<section className="w-full flex justify-center items-center">

					{/* Command section */}
				
					
					<div className="w-full px-4">
						<button 
						className="flex flex-row justify-center items-center
						w-full text-white bg-sky-700 hover:bg-sky-600 duration-100
						rounded p-2 mb-4 w-full
						"
						// onClick={addFurtherItemsAfterFetch}
						onClick={() =>
							addToCart(
								product.id,
								quantities[product.id],
								product.price,
								product.name,
								product.stock
							)}
						>
							<AddShoppingCartOutlinedIcon className=""/>
							<span className="px-2 ubuntu-regular">
								Ajouter au panier
							</span>

						</button>
					</div>
					
					</section>
				</div>
	
			
		</SwiperSlide>

        ))} 	

		{(products.length > 10) && (
		<SwiperSlide className="bg-white rounded-lg 
		lg:w-[15%] md:w-[20%] sm:w-[30%] xs:w-[30%]
		mb-10 scale-90 mt-28">

			<SeeMoreComponent testProps={hanldePropsEvent} />
        </SwiperSlide>

		)}
	
    

    </Swiper>
	
    

  );

}
export default Products_list;
