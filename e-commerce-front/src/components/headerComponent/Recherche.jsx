
import { InputBase, IconButton, InputAdornment } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
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
                aria-label="toggle password visibility"
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