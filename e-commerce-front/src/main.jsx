import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from "./Hooks/Auth.jsx";
import { CartProvider } from "./Hooks/PanierContexte.jsx"
import { LoadingProvider } from "./Hooks/LoadingContext";
import { HistoriqueProvider } from './Hooks/HistoriqueContext.jsx';
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HistoriqueProvider>
      <AuthProvider>
        <CartProvider>
          <LoadingProvider>
            <App />
          </LoadingProvider>
        </CartProvider>
      </AuthProvider>
    </HistoriqueProvider>
  </React.StrictMode>
);
