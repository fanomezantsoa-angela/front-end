import React from "react";
import Produits_type from "./components/Produits_type";
import Layout from "./components/Layout";
import Products_list from "./pages/Products_list";
import { BrowserRouter } from "react-router-dom";
import FormComponent from "./components/form/FormComponent";




const App = () => {


  return (
    <div className="w-full h-full">
      <Layout />
      <Produits_type />
      <div>
        <Products_list />
      </div>

      <div className="mt-30 w-[75%] h-[120px] bg-white mx-auto">
        <FormComponent/>
      </div>
    </div>
  );
};

export default App;
