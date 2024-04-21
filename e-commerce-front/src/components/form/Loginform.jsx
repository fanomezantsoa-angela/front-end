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
// import FacebookIcon from '@mui/icons-material/Facebook';
// import InstagramIcon from '@mui/icons-material/Instagram';
import Box from '@mui/material/Box';
import Swal from "sweetalert2";


function Loginform() {
  const { loading, startLoading, stopLoading } = useContext(LoadingContext);
   const { setIsLoggedIn } = useContext(AuthContext);
  const [email, setEmail, emailchange] = Inputhandler("");
  const [password, setPassword, passwordchange] = Inputhandler("");
 const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
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
     const emailValidation = (email) => {
       return String(email)
         .toLowerCase()
         .match(
           /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
         );
     };
  const loginsubmit = (e) => {
    if (email == "" || password == "") {
      setErrorMessage(true);
    }
    e.preventDefault();
    setIsEmailValid(emailValidation(email));
    startLoading();
    
    
    login(formData)
    .then(response => {
       console.log("is inside function")
       const token = response.data.access;
       localStorage.setItem("token", token);

       setIsLoggedIn(true);

       resetform();
       stopLoading();
       navigate("/");
     })
        .catch((response) => {
          
          stopLoading();
         if(response.response.status == 401){
           Swal.fire({
             title: "erreur",
             text: response.response.data.detail,
             icon: "error",
             showConfirmButton: true,
           });
         } else {
            Swal.fire({
              title: "erreur",
              text: "Veuillez verifier les information que vous avez saisi",
              icon: "error",
              showConfirmButton: true,
            });
          }
          
     });
    
      
     
    stopLoading()
     
    
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
        {!isEmailValid && (
          <p className="p-0 m-0 text-red-500">
            Veuiller saisir un e-mail valide.
          </p>
        )}
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
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
        {errorMessage && (
          <p className="p-0 m-0 text-red-500">
            Veuiller remplir tous les champs.
          </p>
        )}
        <div className="w-full justify-center items-center flex">
          <Button
            action={
              loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    color: "#FFFFFF",
                  }}
                >
                  <CircularProgress
                    sx={{
                      color: "white",
                    }}
                  />
                </Box>
              ) : (
                "Se connecter"
              )
            }
            // action={

            // }
            buttonhandle={loginsubmit}
            classname="bg-sky-700 text-white w-full p-2 rounded-md
            hover:bg-sky-600 ease-in-out duration-75"
          />
        </div>

        {/* Setting redicrection */}
        <div className="mt-10">
            <p className="text-center mt-5 px-8">Vous n'avez pas encore de compte ?  
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
            <p className="text-center px-8">Revenir a 
              <a 
                href="/signup"
                onClick={(e) => {
                  e.preventDefault()
                  navigate("/")
                }}
                className="text-sky-600 px-2 underline">
                l'acceuil
              </a>
            </p>
        </div>
      </form>
    </div>
  );
}
export default Loginform;
