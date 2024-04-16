import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { AuthProvider } from "./Hooks/Auth.jsx";
import { CartProvider } from "./Hooks/PanierContexte.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
      
         
           <App />
       
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
