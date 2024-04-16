import React from "react";
import Produits_type from "./components/Produits_type";
import Layout from "./components/Layout";
import Products_list from "./pages/Products_list";
<<<<<<< HEAD
import { BrowserRouter } from "react-router-dom";
import FormComponent from "./components/form/FormComponent";

=======
import Validationpanier from "./pages/Validationpanier";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profil from "./components/Profil";
import Admin from "./pages/Admin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
>>>>>>> 1fc4c0b (route et payement)



const App = () => {


  return (
<<<<<<< HEAD
    <div className="w-full h-full">
      <Layout />
      <Produits_type />
      <div>
        <Products_list />
      </div>

      <div className="mt-30 w-[75%] h-[120px] bg-white mx-auto">
        <FormComponent/>
      </div>
=======
    <div>
      <Router>
        <Layout />
        <Produits_type />
        <div>
          <Routes>
            <Route path="/" element={<Products_list />} />
            <Route path="/Validerpanier" element={<Validationpanier />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Profil" element={<Profil />} />
            <Route path="/Admin" element={<Admin />} />
          </Routes>
        </div>
      </Router>
>>>>>>> 1fc4c0b (route et payement)
    </div>
  );
};

export default App;
