import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./components/headerComponent/Layout";
import Profil from "./pages/Profil";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
// import Formpayement from "./components/form/Formpayement";
function Routage() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />
      <Route path="/Admin" element={<Admin />} />

      <Route path="/Profil" element={<Profil />} />
      <Route path="/" element={<Home/>} />
    

      <Route path="*" element={<div>Page introuvable</div>} />
    </Routes>
  );
}
export default Routage;
