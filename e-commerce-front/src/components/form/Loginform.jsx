import { Forminput } from "../littlecomponent/Forminput";
import { Inputhandler } from "../../Hooks/Inputhandler";
import { Button } from "../littlecomponent/Button";
import { useState, useContext } from "react";
import { login } from "../../Hooks/API";
import { AuthContext } from "../../Hooks/Auth";
import { InputBase, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../../Hooks/LoadingContext";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';



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
      {/* {loading && <div className="spinner">Loading...</div>} */}
      <form className=" space-y-2">
        
        <div>
          <Forminput
            typeinput="email"
            nomlabel="Address e-mail"
            value={email}
            hasPlaceholder={"email@exemple.com"}
            inputchange={emailchange}
            isRequired={true}
          />
        </div>

        <div>
          <label 
            className="block text-sm font-medium leading-6 text-gray-900">
            Mot de passe
          </label> 
          <InputBase
            className="bg-white block w-full rounded-md border-0 py-[3px] text-gray-900 shadow-sm ring-2 ring-inset ring-sky-700 
            placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-700 sm:text-sm sm:leading-6 px-2 mb-6"
            // placeholder="Password"
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
        </div>

        <div className="w-full justify-center items-center flex">
          <Button 
            action={loading ? <Box sx={{ 
              display: 'flex',
              justifyContent: "center",
              color: "#FFFFFF"
             }}>
              <CircularProgress sx={{
                color: "white"
              }}/>
            </Box> : "Se connecter"} 
            // action={
              
            // } 
            buttonhandle={loginsubmit} 
            classname="bg-sky-700 text-white w-full p-2 rounded-md
            hover:bg-sky-600 ease-in-out duration-75" />
        </div>

        {/* Setting redicrection */}
        <div className="mt-10">
            <p className="text-center mt-5 px-4">Vous n'avez pas encore de compte ?  
              <a 
                href="/signup"
                onClick={(e) => {
                  e.preventDefault()
                  navigate("/signup")
                }}
                className="text-sky-600 px-2 underline">
                Creer ici
              </a>
            </p>
        </div>

      </form>
    </div>
  );
}
export default Loginform;
