import Inscription from "../components/Inscriptionfrom";
import "./landing.css";

import { useState, useEffect } from "react";
import { Button } from "../littlecomponent/Button";
import Loginform from "../components/Loginform"
import Modal from '@mui/material/Modal';
import Box from "@mui/material/Box";
function LandingPage() {
   const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 
    return (
      <div className="container">
        <div className="header-container">
          <img src="./src/assets/socolait.svg" alt="" />
        </div>
        <p>
          Nous partageons <br /> le gout du vrai.
        </p>
        <p>
          Un pays aussi pur ne peut que <br /> produire le meilleur le lait
        </p>
        <section>
          <input type="text" />
          <button>
            <img src="./src/assets/recherche.svg" alt="" />
          </button>
        </section>
        <Button
          action="se connecter"
          classname="se connecter"
          buttonhandle={handleOpen}
        />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="connexion">
            <Button
              action={<img src="./src/assets/fermer.svg" alt=""  />}
              buttonhandle={handleClose}
              classname="fermer"
            />
            <Loginform />
          </Box>
        </Modal>
      </div>
    );
}
export default LandingPage;