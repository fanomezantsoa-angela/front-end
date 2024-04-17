
import Produits_type from "./components/headerComponent/Produits_type";
import Layout from "./components/headerComponent/Layout";
import Products_list from "./components/pages/Products_list";
import Validationpanier from "./components/pages/Validationpanier";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Profil from "./components/pages/Profil";
import Admin from "./components/pages/Admin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";





const App = () => {


  return (
    <div>
      <Router>
        <Layout />
        <Produits_type />

     
      <div  >

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



    </div>
  );
};

export default App;
