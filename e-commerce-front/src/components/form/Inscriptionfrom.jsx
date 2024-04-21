import { Inputhandler } from "../../Hooks/Inputhandler";
import { Button } from "../littlecomponent/Button";
import { inscription } from "../../Hooks/API";

import { Forminput } from "../littlecomponent/Forminput";
import { useContext, useState } from "react";
import { LoadingContext } from "../../Hooks/LoadingContext";

import { useNavigate } from "react-router-dom";

import { InputBase, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Inscription() {
  const { loading, startLoading, stopLoading } = useContext(LoadingContext);

  const [first_name, setFirst_name, first_namechange] = Inputhandler("");
  const [last_name, setLast_name, last_namechange] = Inputhandler("");
  const [email, setEmail, emailchange] = Inputhandler("");
  const [birthdate, setBirthdate, birthdatechange] = Inputhandler("");
  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword, passwordchange] = Inputhandler("");
  const [password1, setPassword1, passwordchange1] = Inputhandler("");
 
  
 const [errors, setErrors] = useState({});
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const navigate = useNavigate();
  const formData = {
    first_name: first_name,
    last_name: last_name,

    email: email,
    password: password,
    birthdate: birthdate,

    is_staff: true,
    is_superuser: false,
    is_active: true,
  };
  const resetform = () => {
    setFirst_name("");
    setLast_name("");
    setEmail("");
    setBirthdate("");

    setPassword("");
    setPassword1("");
  };

  const emailValidation = (email) => {
    const validation =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validation.test(email);
    
    
  };

 

 
    const validateValues = (formData, confpwd) => {
      let errors = {};
      if (formData.first_name.length < 5) {
        errors.first_name="votre nom doit au moins 5 caractère"
      }
       if (formData.last_name.length < 5) {
         errors.first_name = "votre prénom doit au moins 5 caractère";
       }
      if (emailValidation(formData.email) == false) {
      
        errors.email = "Email invalide";
      }
      if (formData.password.length < 8) {
        errors.password = "le mot de passe doit avoir au moins 8 caractègit mercres";
      }
      if (formData.password !== confpwd) {
        errors.confpwd = "veuillez ecrire le même mot de passe";
      }
      return errors;
    };


  const inscriptionsubmit =  (e) => {
    e.preventDefault();
    setErrors(validateValues(formData, password1));
    console.log(Object.keys(errors).length);
    if (Object.keys(errors).length >= 1) {
      stopLoading();
    }
    else {
      startLoading();
      inscription(formData)
        .then((responseData) => {
          console.log(responseData.status);

          console.log("Response:", responseData);

          resetform();
          Swal.fire({
            title: "Inscription  effectuée",
            text: "vous êtes inscrit dans le site",
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
          });
          navigate("/Login");
        })
        .catch((response) => {
          if (
            response.response.data.email ==
            "Un objet custom user avec ce champ email existe déjà."
          ) {
            Swal.fire({
              title: "Erreur",
              text: "ce champ email existe déjà",
              icon: "error",
              showConfirmButton: true,
            });
          } else {
            Swal.fire({
              title: "Erreur",
              text: "il y a une erreur innatendu",
              icon: "error",
              showConfirmButton: true,
            });
          }

          stopLoading();
        });
    }
    stopLoading();
  };
  return (
    <div className="inscription-container">
      <form className=" space-y-1">
        <div className="flex flex-row justify-between items-center">
          <div>
            <Forminput
              typeinput="text"
              nomlabel="Nom"
              value={first_name}
              inputchange={first_namechange}
              isRequired={true}
            />
          </div>
          <div>
            <Forminput
              typeinput="text"
              nomlabel="Prenom"
              value={last_name}
              inputchange={last_namechange}
              isRequired={true}
            />
          </div>
        </div>

        <Forminput
          typeinput="email"
          nomlabel="Addresse E-mail"
          hasPlaceholder={"mail@exemple.com"}
          value={email}
          inputchange={emailchange}
          isRequired={true}
        />
        <p className="p-0 m-0 text-red-500">{errors.email}</p>

        <Forminput
          typeinput="date"
          nomlabel="Date de naissance"
          value={birthdate}
          inputchange={birthdatechange}
          isRequired={true}
        />

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
        <div>
          <label className="block text-sm font-medium leading-6 text-gray-900">
            Conrifmer votre mot de passe
          </label>
          <InputBase
            className="bg-white block w-full rounded-md border-0 py-[3px] text-gray-900 shadow-sm ring-2 ring-inset ring-sky-700 
            placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-700 sm:text-sm sm:leading-6 px-2 mb-6"
            // placeholder="Password"
            type={"password"}
            value={password1}
            onChange={passwordchange1}
          />
        </div>

        <p className="p-0 m-0 text-red-500">{errors.confpwd}</p>

        {/* <Button
          action="Sign up"
          buttonhandle={inscriptionsubmit}
          classname="sign up"
        /> */}
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
              "Valider"
            )
          }
          // action={

          // }
          buttonhandle={inscriptionsubmit}
          classname="bg-sky-700 text-white w-full p-2 rounded-md
            hover:bg-sky-600 ease-in-out duration-75"
        />
      </form>

      {/* Setting redicrection */}
      <div className="mt-5">
        <p className="text-center mt-5 px-4">
          Vous avez un compte ?
          <a
            href="/signup"
            onClick={(e) => {
              e.preventDefault();
              navigate("/Login");
            }}
            className="text-sky-600 px-2 underline"
          >
            Connectez-vous ici
          </a>
        </p>
      </div>
    </div>
  );
}
export default Inscription;
