import { useState, useEffect } from "react";
import { Button } from "../littlecomponent/Button";
import Loginform from "../components/Loginform";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Inscription from "../components/Inscriptionfrom";
import "./seconnecter.css";
export default function Seconnecter() {
  const [open, setOpen] = useState(false);
  const [openinscription, setOpeninscription] = useState(false);
  const handleCloseinscrit = () => setOpeninscription(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpeninscrit = () => {
    setOpen(false);
    setOpeninscription(true);
  };

  return (
    <div>
      <Button
        action="se connecter"
        classname="seconnecter"
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
            action={<img src="./src/assets/fermer.svg" alt="" />}
            buttonhandle={handleClose}
            classname="fermer"
          />

          <Loginform closeform={handleClose} />
          <Button
            buttonhandle={handleOpeninscrit}
            action="s'inscrire"
            classname="inscrire"
          />
        </Box>
      </Modal>
      <Modal
        open={openinscription}
        onClose={handleCloseinscrit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="inscription">
          <Button
            action={<img src="./src/assets/fermer.svg" alt="" />}
            buttonhandle={handleCloseinscrit}
            classname="fermer"
          />

          <Inscription
            openlogin={handleOpen}
            closeinscrit={handleCloseinscrit}
          />
        </Box>
      </Modal>
    </div>
  );
}
