import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Validationpanier from "../pages/Validationpanier";
import Profil from "../pages/Profil";
import Admin from "../pages/Admin";
import Home from "../pages/Home";
import PrivateRoute from "./privateRoute";
function Routage() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<PrivateRoute />}>
        <Route path="/Validerpanier" element={<Validationpanier />} />
        <Route path="/Profil" element={<Profil />} />
        <Route path="/Admin" element={<Admin />} />
      </Route>

      <Route path="/" element={<Home />} />
      <Route path="*" element={<div>Page introuvable</div>} />
    </Routes>
  );
}
export default Routage;
