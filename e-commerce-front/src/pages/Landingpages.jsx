import Inscription from "../components/Inscriptionfrom";
import { Inputhandler } from "../Hooks/Inputhandler";

import { useState, useEffect } from "react";
function LandingPage() {
  
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
        <input type="text" />
        <button>
          <img src="./src/assets/recherche.svg" alt="" />
        </button>
        <button>se connecter</button>
      </div>
    );
}
export default LandingPage;