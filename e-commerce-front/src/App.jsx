
import Produits_type from "./components/headerComponent/Produits_type";
import Layout from "./components/headerComponent/Layout";
import Products_list from "./pages/Products_list";
import Validationpanier from "./pages/Validationpanier";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profil from "./pages/Profil";
import Admin from "./pages/Admin";

import { BrowserRouter } from "react-router-dom";
import Routage from "./Routage";




const App = () => {


  return (
    <BrowserRouter>
      <Routage />
    </BrowserRouter>
  );
};

export default App;
