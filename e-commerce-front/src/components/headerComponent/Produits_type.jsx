import { Product_typesContext } from "../../Hooks/Product_typesContext";
import { useState, useEffect, useContext } from "react";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { type_product } from "../../Hooks/API";
import { SearchproductContext } from "../../Hooks/SearchContext";
import { Product_per_type, Product_list } from "../../Hooks/productAPI";
import "./produits_types.css";
function Produits_type() {
  const { setProductresult } = useContext(SearchproductContext);
  const { typeproduct, setTypeproduct } = useContext(Product_typesContext);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const [typeOptions, setTypeOptions] = useState([]);

  const [active, setActive] = useState(null)


  useEffect(() => {
    async function fetchTypeList() {
      const types = await type_product();
      if (types.status == 200) {
        setTypeOptions(types.data.results);
        console.log("ALL TYPE OF PRODUCT")
        console.log(types.data.results)
      } else {
        console.log(types);
      }
    }
    fetchTypeList();
    getAllproduct(); 
  }, []);
  //fonction qui recupere le produit cliqué
    const getSelectedtype = (id, index) => {
      setActive(index)
      Product_per_type(id)
      .then((response) => {
        console.log(response.data.product);
        setProductresult([])
        setTypeproduct([])
        setTypeproduct(response.data.product);
        console.log("type selected", typeproduct)
        
      })
     
      .catch((error) => {
        console.log(error)
      })
     
    };
    const getAllproduct = () => {
    setActive(null)
    Product_list()
      .then((response) => {
        setProductresult([])
        setTypeproduct([])
         console.log(response.results);
         setTypeproduct(response.results);
         console.log("type selected", typeproduct);
        

       })
       
       .catch((error) => {
         console.log(error);
       });
       
  }
  return (
    <>
      <ul className="Type-produit bg-white p-5 flex flex-row justify-around items-center w-full">
        <button>
          <li className="text-white  ubuntu-medium bg-sky-500 px-3 py-1 rounded-lg border hover:bg-sky-400 duration-100 " 
          onClick={() => getAllproduct()}>Tous les produits</li>
        </button>

        {typeOptions.map((typeOption, index) => (
          <button key={index}>
            <li key={index} onClick={() => getSelectedtype(typeOption.id, index)} 
            className={`${"text-sky-700 ubuntu-medium bg-white hover:border hover:border-sky-500 rounded-full duration-150 px-3 py-1"} 
            ${(index == active) && "border-sky-500 border"}`}
            >
              {typeOption.designation}
            </li>
          </button>
        ))}
      </ul>

      <img src="./src/assets/vague.png" alt="" className="w-full h-[120px] bg-white" />
    </>
  );
}
export default Produits_type;
