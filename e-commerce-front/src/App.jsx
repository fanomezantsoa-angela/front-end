import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landingpages from "./pages/Landingpages";
import Products_list from "./pages/Products_list";
import PrivateRoute from "./littlecomponent/PrivateRoute"
import Loginform from "./components/Loginform"

import Auth from "./Hooks/Auth";

const App = () => {
  const { isLoggedIn } = Auth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpages />} />
        <Route path="/login" element={<Loginform />} />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Products_list />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
