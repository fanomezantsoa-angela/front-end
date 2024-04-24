import { createContext } from "react";
import { useState } from "react";
export const Product_typesContext = createContext();
export const ProductTypesProvider = ({ children }) => {
  const [typeproduct, setTypeproduct] = useState("");

  return (
    <Product_typesContext.Provider value={[ typeproduct, setTypeproduct ]}>
      {children}
    </Product_typesContext.Provider>
  );
};