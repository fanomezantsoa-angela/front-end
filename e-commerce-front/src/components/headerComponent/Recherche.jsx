
import { InputBase, IconButton, InputAdornment } from "@mui/material";

function Recherche() {
    return (
      <div>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="chercher un produit"
          className="bg-slate-50"
          inputProps={{ "aria-label": "chercher un produit" }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="recherche"
              >
                <img src="./src/assets/recherche.svg" alt="" />
              </IconButton>
            </InputAdornment>
          }
        />
       
      </div>
    );
  
}
export default Recherche;