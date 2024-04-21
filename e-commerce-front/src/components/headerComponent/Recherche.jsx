import { SearchproductContext } from "../../Hooks/SearchContext";
import { InputBase, IconButton, InputAdornment } from "@mui/material";
import { useContext } from "react";

function Recherche() {
  const { updateSearchTerm } = useContext(SearchproductContext);
   const handleInputChange = (event) => {
    updateSearchTerm(event.target.value);
  };

    return (
      <div className="flex flex-center justify-center m-10">
        <InputBase
          placeholder="Chercher un produit"
          onChange={handleInputChange}
          className="bg-slate-50 block w-full rounded-full border-0 py-[7px] px-5 text-gray-900 shadow-gray-100  ring-2 ring-inset ring-slate-400 
          placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-700 sm:text-sm sm:leading-6
          hover:py-[10px]  duration-75"
          inputProps={{ "aria-label": "chercher un produit" }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton type="button" aria-label="recherche">
                {/* <img src="./src/assets/recherche.svg" alt="" /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 stroke-slate-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </IconButton>
            </InputAdornment>
          }
         
        />
      </div>
    );
  
}
export default Recherche;