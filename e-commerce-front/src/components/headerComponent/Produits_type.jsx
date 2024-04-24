import { Product_typesContext } from "../../Hooks/Product_typesContext";
import { useState, useEffect, useContext } from "react";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { type_product } from "../../Hooks/API";

import { Product_per_type, Product_list } from "../../Hooks/productAPI";
import "./produits_types.css";
function Produits_type() {
  
  const [typeproduct, setTypeproduct] = useContext(Product_typesContext);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const [typeOptions, setTypeOptions] = useState([]);
  useEffect(() => {
    async function fetchTypeList() {
      const types = await type_product();
      if (types.status == 200) {
        setTypeOptions(types.data.results);
      } else {
        console.log(types);
      }
    }
    fetchTypeList();
    getAllproduct(); 
  }, []);
  //fonction qui recupere le produit cliqué
    const getSelectedtype = (id) => {
      Product_per_type(id)
      .then((response) => {
        console.log(response.data.product);
        setTypeproduct(response.data.product);
        console.log("type selected", typeproduct)
      })
        .catch((error) => {
      console.log(error)
  })
  };
  const getAllproduct = () => {
    Product_list()
      .then((response) => {
         console.log(response.results);
         setTypeproduct(response.results);
         console.log("type selected", typeproduct);
       }).catch((error) => {
         console.log(error);
       });
  }
  return (
    <>
      <ul className="Type-produit">
        <button>
          <li onClick={() => getAllproduct()}>Tous les produits</li>
        </button>
        {typeOptions.map((typeOption, index) => (
          <button>
            <li key={index} onClick={() => getSelectedtype(typeOption.id)}>
              {typeOption.designation}
            </li>
          </button>
        ))}
      </ul>

      <img src="./src/assets/vague.png" alt="" className="vague" />
    </>
  );
}
export default Produits_type;
