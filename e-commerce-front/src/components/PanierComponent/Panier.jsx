import { Button } from "../littlecomponent/Button";
// import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState, useEffect, useContext } from "react";
import Paniers from "./Paniers";
import "./panier.css"
import { CartContext } from "../../Hooks/PanierContexte";
function Panier() {
  const { items } = useContext(CartContext);
    const [panier, setPanier] = useState(false)
    const panierOpen = () => setPanier(true);
    const panierClose = () => setPanier(false);
    return (
      <div className="">
        <section>
            <Button
              classname="hover:scale-110 hover:bg-sky-50 px-3 py-2 rounded-full duration-75"
              aria-label="panier"
              buttonhandle={panierOpen}
              action={
                // <img src="./src/assets/panier2.svg" alt="" className="panier" />
                // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                //   className="w-12 h-12 fill-sky-700 rounded-full">
                //   <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                // </svg>

                // <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                //   className="w-12 h-12 stroke-2 stroke-sky-700 rounded-full">
                //   <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                // </svg>

                <Badge color="primary" badgeContent={items.length} max={10}>
                  {/* <MailIcon /> */}
                  {
                    items.length < 1 ? (
                      <ShoppingCartOutlinedIcon sx={{fontSize: 40,}} className="text-sky-700"/>
                    ) : (
                      <ShoppingCartIcon sx={{fontSize: 40,}} className="text-sky-700"/>
                    ) 
                  }
                  
                </Badge>
                
              }
            ></Button>
        </section>

        <Modal
          open={panier}
          onClose={panierClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="paniers">
          
              <Paniers panierClose={panierClose} />
         
          </Box>
        </Modal>
       
      </div>
    );
}
export default Panier;