import { createContext } from "react";
import { useState } from "react";
export const SearchproductContext = createContext();
export const SearchProvider = ({ children }) => {
 const [productresult, setProductresult] = useState([]);
   
  return (
    <SearchproductContext.Provider value={{ productresult, setProductresult }}>
      {children}
    </SearchproductContext.Provider>
  );
};
