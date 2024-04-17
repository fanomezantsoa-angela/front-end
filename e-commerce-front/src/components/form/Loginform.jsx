import { Forminput } from "../littlecomponent/Forminput";
import { Formulaire } from "../littlecomponent/Formulaire";
import { Inputhandler } from "../Hooks/Inputhandler";
import { Button } from "../littlecomponent/Button";
import { useState, useEffect, useContext } from "react";
import { login } from "../Hooks/API";
import { AuthContext } from "../Hooks/Auth";
import { InputBase, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";;
function Loginform({ closeform }) {
   const { setIsLoggedIn } = useContext(AuthContext);
  const [email, setEmail, emailchange] = Inputhandler("");
  const [password, setPassword, passwordchange] = Inputhandler("");
 const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
 const handleClickShowPassword = () => setShowPassword((show) => !show);
  const formData = {
    email: email,
    password: password,
  };
   const resetform = () => {
   
     setEmail("");
     

     setPassword("");
   };

  const loginsubmit = async (e) => {
    e.preventDefault();
    try {
      const responseData = await login(formData);
      
      const token = responseData.access;
      localStorage.setItem("token", token);
      
      setIsLoggedIn(true);
   
      resetform();
      closeform();
     
      
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <form className="login-form">
        <Forminput
          typeinput="email"
          nomlabel="Email"
          value={email}
          inputchange={emailchange}
        />

        <InputBase
          className="bg-slate-50"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={passwordchange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <Button action="Login" buttonhandle={loginsubmit} classname="login" />
      </form>
    </div>
  );
}
export default Loginform;
