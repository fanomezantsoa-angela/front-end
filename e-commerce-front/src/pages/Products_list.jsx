import { Product_list } from "../Hooks/productAPI";
import { useState, useEffect } from "react";
import "./produits_list.css"
function Products_list() {
  const [products, setProducts] = useState([]);
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
            <img src="./src/assets/yaourt-nature.jpg" alt="" className="produit-img"/>
            <p className="nom-produit">{product.name}</p>
            <p className="desciption">{product.description}</p>
            <p className="price">{product.price} Ar</p>
            <section>
              
            </section>
          </div>
        ))}
      </div>
    );


}
export default Products_list;