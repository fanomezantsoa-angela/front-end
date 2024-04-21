import { createContext } from "react";
import { useState } from "react";
export const Product_typesContext = createContext();
export const ProductTypesProvider = ({ children }) => {
  const [selectedType, setSelectedType] = useState("");

  return (
    <Product_typesContext.Provider value={[selectedType, setSelectedType]}>
      {children}
    </Product_typesContext.Provider>
  );
};