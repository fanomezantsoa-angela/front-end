import { Button } from "../littlecomponent/Button";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Badge from '@mui/material/Badge';
import { useState, useEffect, useContext } from "react";
import Paniers from "../littlecomponent/Paniers";
import "./panier.css"
import { CartContext } from "../Hooks/PanierContexte";
function Panier() {
  const { items } = useContext(CartContext);
    const [panier, setPanier] = useState(false)
    const panierOpen = () => setPanier(true);
    const panierClose = () => setPanier(false);
    return (
      <div className="panier-modal">
        <section>
          <Badge
            badgeContent={items.length}
            color="primary"
            className="badge-panier"
          >
            <Button
              classname="panier"
              aria-label="panier"
              buttonhandle={panierOpen}
              action={
                <img src="./src/assets/panier2.svg" alt="" className="panier" />
              }
            ></Button>
          </Badge>
        </section>

        <Modal
          open={panier}
          onClose={panierClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="paniers">
            {items.length < 1 ? (
              <p>No items in your cart</p>
            ) : (
              <Paniers panierClose={panierClose} />
            )}
          </Box>
        </Modal>
      </div>
    );
}
export default Panier;