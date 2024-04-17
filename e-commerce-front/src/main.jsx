import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from "./Hooks/Auth.jsx";
import { CartProvider } from "./Hooks/PanierContexte.jsx"
  import { LoadingProvider } from "./Hooks/LoadingContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
