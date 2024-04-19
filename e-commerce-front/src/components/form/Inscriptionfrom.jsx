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
  const [errorMessage, setErrorMessage] = useState(true);
  const [validationpwd, setValidationpwd] = useState(false);
  const [errormail, setErrormail] = useState(false);
  const [confirmerpwd, setConfirmerpwd] = useState(false);
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
    const validation = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/
    return validation.test(email);
    
    
  };

  function validerNom(nom) {
    const nomRegex = /^[a-zA-ZÀ-ÿ\-\'\s]+$/;
    return nomRegex.test(nom);
  }

  // Fonction de validation du mot de passe
  function validerMotDePasse(motDePasse) {
    const motDePasseRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,}$/;

    return motDePasseRegex.test(motDePasse);
  }

  // Fonction de validation de la confirmation du mot de passe
  function validerConfirmationMotDePasse(motDePasse, confirmationMotDePasse) {}

  const inscriptionsubmit = async (e) => {
    e.preventDefault();
    
   if (emailValidation(email) == false) {
     setErrormail(true);
     stopLoading();
   }
    
    else if (validerMotDePasse(password) == false) {
     setValidationpwd(true);
      stopLoading();
    }
    else if (validerConfirmationMotDePasse(password, password1) == false) {
      setConfirmerpwd(true);
      stopLoading();
    }
    
    else {
    try {
          startLoading();
      const responseData = await inscription(formData);

      if (responseData.status == 201) {
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
      } else {
        Swal.fire({
          title: "Erreur",
          text: responseData.response.data.detail,
          icon: "error",
          showConfirmButton: true,
        });
      }

      stopLoading();
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      Swal.fire({
        title: "Oupss",
        text: "Une erreur innatendu s'est produite, veuiller reessayer.",
        icon: "error",
        showConfirmButton: true,
      });
      stopLoading();
    }
      
    stopLoading();
  }
   
  };
  return (
    <div className="inscription-container">
      <form className=" space-y-1">
        <Forminput
          typeinput="text"
          nomlabel="Nom"
          value={first_name}
          inputchange={first_namechange}
          isRequired={true}
        />
        <Forminput
          typeinput="text"
          nomlabel="Prenom"
          value={last_name}
          inputchange={last_namechange}
          isRequired={true}
        />

        <Forminput
          typeinput="email"
          nomlabel="Addresse E-mail"
          hasPlaceholder={"mail@exemple.com"}
          value={email}
          inputchange={emailchange}
          isRequired={true}
        />
        {errormail && (
          <p className="p-0 m-0 text-red-500">
            Veuiller saisir un e-mail valide.
          </p>
        )}

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
       {validationpwd && (
          <p className="p-0 m-0 text-red-500">
            Votre mot de doit être plus de 8 caractere, possède du lettre et du
            caractère spécial .
          </p>
      )}
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
       
        {confirmerpwd && (
          <p className="p-0 m-0 text-red-500">
            Vous devez ecrire le même mot de passe.
          </p>
        )} 

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
