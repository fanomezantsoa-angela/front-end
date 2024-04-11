import { Button } from "../littlecomponent/Button";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";
function Panier() {
    const [panier, setPanier] = useState(false)
    const panierOpen = () => setPanier(true);
    const panierClose = () => setPanier(false);
    return (
      <div>
        <Button
          action={<img src="./src/assets/panier2.svg" alt="" />}
          classname=""
          buttonhandle={panierOpen}
        />
      </div>
    );
}
export default Panier;