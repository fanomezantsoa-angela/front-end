
import "./layout.css";

import { useNavigate } from "react-router-dom";
import Userthings from "./Userthings";
import {Button} from "../littlecomponent/Button"
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Hooks/Auth";
function Layout() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    const getToken = localStorage.getItem("token");

    if (getToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const dirigerLogin = () => {
  navigate("/Login");
}
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
  
        {isLoggedIn ? (
          <Userthings />
        ) : (
          <Button
            action="se connecter"
            classname="seconnecter"
            buttonhandle={dirigerLogin}
          />
        )}
     
    </div>
  );
}
export default Layout;
