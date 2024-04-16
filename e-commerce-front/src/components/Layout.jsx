
import "./layout.css";
import Seconnecter from "./Seconnecter";
import Userthings from "./Userthings";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import {useState, useEffect, useContext } from "react";
import { AuthContext } from "../Hooks/Auth";
function Layout() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  useEffect(() => {
     
     const getToken = localStorage.getItem("token");

     if (getToken) {
       setIsLoggedIn(true)
     }
     else {
       setIsLoggedIn(false)
     }
      
  
   }, []);

  return (
    <div className="container_header ">
      <section className="sec-slogan">
        <img src="./src/assets/socolait.svg" alt="" className="logo" />
        <section>
          <p className="slogan1">
            Nous partageons <br /> le gout du vrai.
          </p>

          <p className="slogan2">
            Un pays aussi pur ne peut que <br /> produire le meilleur le lait
          </p>
        </section>
      </section>
      <section className="recherche">
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="chercher un produit"
          inputProps={{ "aria-label": "chercher un produit" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <img src="./src/assets/recherche.svg" alt="" />
        </IconButton>
      </section>
      {isLoggedIn ? (
        <Userthings loggein={setIsLoggedIn} />
      ) : (
        <Seconnecter setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}
export default Layout;
