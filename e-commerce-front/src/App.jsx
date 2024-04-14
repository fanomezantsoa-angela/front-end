import React from "react";
import Produits_type from "./components/Produits_type";
import Layout from "./components/Layout";
import Products_list from "./pages/Products_list";
import { BrowserRouter } from "react-router-dom";



const App = () => {


  return (
    
      <div>
      <Layout />
      <Produits_type />
      <div>
        <Products_list />
      </div>
    </div>
  );
};

export default App;
