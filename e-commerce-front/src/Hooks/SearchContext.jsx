import { createContext } from "react";
import { useState } from "react";
export const SearchproductContext = createContext();
export const SearchProvider = ({ children }) => {
  const [searchedproduct, setSearchedproduct] = useState("");
     const updateSearchTerm = (term) => {
       setSearchedproduct(term);
     };
  return (
    <SearchproductContext.Provider
      value={{ searchedproduct, updateSearchTerm }}
    >
      {children}
    </SearchproductContext.Provider>
  );
};
