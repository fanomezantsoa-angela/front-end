import Produits_type from "./components/headerComponent/Produits_type";
import Layout from "./components/headerComponent/Layout";
import Products_list from "./pages/Products_list";
import Validationpanier from "./pages/Validationpanier";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profil from "./pages/Profil";
import Admin from "./pages/Admin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Layout/>
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
    </div>
  );
};

export default App;
