import { Forminput } from "../littlecomponent/Forminput";
import { Inputhandler } from "../../Hooks/Inputhandler";
import { Button } from "../littlecomponent/Button";
import { useState, useContext } from "react";
import { login } from "../../Hooks/API";
import { AuthContext } from "../../Hooks/Auth";
import { InputBase, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { LoadingContext } from "../../Hooks/LoadingContext";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Swal from "sweetalert2";
import { isAdmincheck } from "../../Hooks/Usersetting";
import Cookies from "js-cookie"
function Loginform() {
    const location = useLocation();
  
    const params = new URLSearchParams(location.search);
    const returnURL = params.get("returnURL");
  const { loading, startLoading, stopLoading } = useContext(LoadingContext);
  const { setIsLoggedIn, setIsAdmin } = useContext(AuthContext);
  const [email, setEmail, emailchange] = Inputhandler("");
  const [password, setPassword, passwordchange] = Inputhandler("");
 const [showPassword, setShowPassword] = useState(false);

   const [errors, setErrors] = useState({});
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
      const validation =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return validation.test(email);
  };
   const validateValues = (formData) => {
     let errors = {};
   
     if (emailValidation(formData.email) == false) {
       errors.email = "Email invalide";
     }
     if (formData.password.length < 5) {
       errors.password = "le mot de passe doit avoir au moins 8 caractères";
     }
    
     return errors;
   };
 const loginsubmit = (e) => {
   e.preventDefault();
   const newErrors = validateValues(formData);
   setErrors(newErrors);

   if (Object.keys(newErrors).length === 0) {
     startLoading();
     login(formData)
       .then((response) => {
         console.log(response)
         const token = response.data.access;
         const refreshToken = response.data.refresh
        
         Cookies.set("token", token, {expires: 1/24})
         Cookies.set("refreshToken", refreshToken, {expires: 7})
         
         setIsLoggedIn(true);
         setIsAdmin(isAdmincheck());
          console.log("admin?", isAdmincheck());
         resetform();
          if (returnURL) {
           navigate(decodeURIComponent(returnURL));
          } else {
           navigate("/");
          }
       })
       .catch((error) => {
         console.log(error)
         const errorResponse = error.response;
         Swal.fire({
           title: "Erreur",
           text:
             errorResponse && errorResponse.status === 401
               ? errorResponse.data.detail
               : "Veuillez vérifier les informations que vous avez saisies",
           icon: "error",
           confirmButtonText: "OK",
         });
         stopLoading();
       })
     
       .finally(() => {
         stopLoading();
       });
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
        <p className="p-0 m-0 text-red-500">{errors.email}</p>
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
        <p className="p-0 m-0 text-red-500">{errors.password}</p>
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
          <p className="text-center mt-5 px-4">
            Vous n'avez pas encore de compte ?
            <a
              href="/signup"
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}
              className="text-sky-600 px-2 underline"
            >
              Creer ici
            </a>
          </p>
          <p className="text-center  px-4">
          Retouner a 
            <a
              href="/signup"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
              className="text-sky-600 px-2 underline"
            >
              l'acceuil
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
export default Loginform;
