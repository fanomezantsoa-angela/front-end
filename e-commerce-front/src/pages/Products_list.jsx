import { Product_list } from "../Hooks/productAPI";
import { useState, useEffect } from "react";
function Products_list() {
  const [products, setProducts] = useState([]);
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
      <div className="card">
        {products.map((product) => (
          <div key={product.id}>
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{product.description}</p>
            <span className="price">{product.price} Ar</span>
          </div>
        ))}
      </div>
    );


}
export default Products_list;