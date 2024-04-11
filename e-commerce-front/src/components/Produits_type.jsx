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
    const getToken = localStorage.getItem("token"); 
    console.log(getToken)
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
          <Grid container spacing={3}>
            <Grid xs key={index} value={typeOption.id}>
              <Item>{typeOption.designation}</Item>
            </Grid>
          </Grid>
        ))}
      </>
    );
}
export default Produits_type;