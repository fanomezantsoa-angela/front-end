import { Forminput } from "../littlecomponent/Forminput";
import { Formulaire } from "../littlecomponent/Formulaire";
import { Inputhandler } from "../../Hooks/Inputhandler";
import { Button } from "../littlecomponent/Button";
import { useState, useEffect, useContext } from "react";
import { login } from "../../Hooks/API";
import { AuthContext } from "../../Hooks/Auth";
import { InputBase, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../../Hooks/LoadingContext";
function Loginform() {
  const { loading, startLoading, stopLoading } = useContext(LoadingContext);
   const { setIsLoggedIn } = useContext(AuthContext);
  const [email, setEmail, emailchange] = Inputhandler("");
  const [password, setPassword, passwordchange] = Inputhandler("");
 const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();
  const formData = {
    email: email,
    password: password,
  };
   const resetform = () => {
   
     setEmail("");
     

     setPassword("");
   };

  const loginsubmit = async (e) => {
    if (email == "" || password == "") {
      setErrorMessage(true);
    }
    e.preventDefault();
      startLoading();
    
  
      const responseData = await login(formData);
    if (responseData.status == 200) {
          const token = responseData.access;
          localStorage.setItem("token", token);

          setIsLoggedIn(true);

          resetform();
          stopLoading();
          navigate("/");
       }
    else {
      console.log(responseData);
     }
      
     
  
     
    
  };
  return (
    <div>
      {loading && <div className="spinner">Loading...</div>}
      <form className="login-form">
        <Forminput
          typeinput="email"
          nomlabel="Email"
          value={email}
          inputchange={emailchange}
        />
        <br />
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
        />{" "}
        <br />
        {errorMessage && (
          <div className="text-xs text-red-700">Veuiler remplir les champs </div>
        )}
        <Button action="Login" buttonhandle={loginsubmit} classname="login" />{" "}
        <br />
        <Button
          action="Créer un compte"
          buttonhandle={() => navigate("/Signup")}
          classname="s'inscrire"
        />
      </form>
    </div>
  );
}
export default Loginform;
