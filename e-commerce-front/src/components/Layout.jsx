
import "./layout.css";
import Seconnecter from "./Seconnecter";
import Userthings from "./Userthings";
import {useState, useEffect, useContext } from "react";
import { AuthContext } from "../Hooks/Auth";
function Layout() {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  useEffect(() => {
     
     const getToken = localStorage.getItem("token");
     console.log(getToken);
     if (getToken) {
       setIsLoggedIn(true)
     }
     else {
       setIsLoggedIn(false)
     }
      
  
   }, []);

  return (
    <div className="container">
      <section className="sec-slogan">
        <img src="./src/assets/socolait.svg" alt="" />
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
        <input type="text" />
        <button>
          <img src="./src/assets/recherche.svg" alt="" className="rechercher" />
        </button>
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
