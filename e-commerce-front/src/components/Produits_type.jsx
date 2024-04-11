import Grid from "@mui/material/Unstable_Grid2";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {type_product } from "../Hooks/API";
function Produits_type() {
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
      try {
        const types = await type_product();

        setTypeOptions(types.results);
      } catch (error) {
        console.error("Error fetching type list:", error);
      }
    }
    fetchTypeList();
  }, []);
    return (
      <>
        {typeOptions.map((typeOption, index) => (
          <ul key={index}>
            <li>
              {typeOption.designation}
            </li>
          </ul>
             
           
        ))}
      </>
    );
}
export default Produits_type;