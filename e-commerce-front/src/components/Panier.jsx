import { Button } from "../littlecomponent/Button";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";
import "./panier.css"
function Panier() {
    const [panier, setPanier] = useState(false)
    const panierOpen = () => setPanier(true);
    const panierClose = () => setPanier(false);
    return (
      <div>
        <IconButton type="button" sx={{ p: "10px" }} aria-label="panier">
          <img src="./src/assets/panier2.svg" alt="" className="panier" />
        </IconButton>
      
      </div>
    );
}
export default Panier;