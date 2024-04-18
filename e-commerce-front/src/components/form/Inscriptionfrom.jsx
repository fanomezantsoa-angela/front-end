import { Inputhandler } from "../../Hooks/Inputhandler";
import { Button } from "../littlecomponent/Button";
import {inscription} from "../../Hooks/API";

import { Forminput } from "../littlecomponent/Forminput";
import { useContext, useState } from "react";
import { LoadingContext } from "../../Hooks/LoadingContext";

import { useNavigate } from "react-router-dom";

import { InputBase, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Inscription() {
  const { loading, startLoading, stopLoading } = useContext(LoadingContext);
  const [first_name, setFirst_name, first_namechange] = Inputhandler("");
  const [last_name, setLast_name, last_namechange] = Inputhandler("");
  const [email, setEmail, emailchange] = Inputhandler("");
  const [birthdate, setBirthdate, birthdatechange] = Inputhandler("");
  const [showPassword, setShowPassword] = useState(false);
 
  const [password, setPassword, passwordchange] = Inputhandler("");
  const [password1, setPassword1, passwordchange1] = Inputhandler("");
  const [errorMessage, setErrorMessage] = useState(false);

  // For email validation
  const [isEmailValid, setIsEmailValid] = useState(true)

  const handleClickShowPassword = () => setShowPassword((show) => !show); 

  const navigate = useNavigate()
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
    setPassword1("")
  };

  const emailValidation = (email) => {
    return String(email).toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  }


  // const emailchange = (event) => {
  //   const email = event.target.value;
  //   setIsEmailValid(emailValidation(email))
  //   console.log(isEmailValid)
  //   setEmail(email)
  // }


  const inscriptionsubmit = async (e) => {
    e.preventDefault();
    setIsEmailValid(emailValidation(email))
    if (email == "" || password == "" || first_name =="" || last_name == "" || birthdate == "") {
      setErrorMessage(true);
    } else {
		if(isEmailValid){
			startLoading()
			
			console.log(formData)
			try {
				const responseData = await inscription(formData);
				if (responseData.status == 201) {
				
					console.log("Response:", responseData);
					resetform();
					navigate("/Login");
				} else {
					// console.error(error)
				}
				
				stopLoading()
				} catch (error) {
					// Handle errors
					console.error("Error:", error);
					stopLoading()
				}
			}
			stopLoading()
		}
	stopLoading()
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
        {!isEmailValid && <p className="p-0 m-0 text-red-500">Veuiller saisir un e-mail valide.</p>}
        
        <Forminput
          typeinput="date"
          nomlabel="Date de naissance"
          value={birthdate}
          inputchange={birthdatechange}
          isRequired={true}
        />

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

        <div>
          <label 
            className="block text-sm font-medium leading-6 text-gray-900">
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

        {/* <Button
          action="Sign up"
          buttonhandle={inscriptionsubmit}
          classname="sign up"
        /> */}
        <Button 
            action={loading ? <Box sx={{ 
              display: 'flex',
              justifyContent: "center",
              color: "#FFFFFF"
             }}>
              <CircularProgress sx={{
                color: "white"
              }} />
            </Box> : "Valider"} 
            // action={
              
            // } 
            buttonhandle={inscriptionsubmit} 
            classname="bg-sky-700 text-white w-full p-2 rounded-md
            hover:bg-sky-600 ease-in-out duration-75" />
      </form>

       {/* Setting redicrection */}
       <div className="mt-5">
            <p className="text-center mt-5 px-4">Vous avez un compte ?  
              <a 
                href="/signup"
                onClick={(e) => {
                  e.preventDefault()
                  navigate("/login")
                }}
                className="text-sky-600 px-2 underline">
                Connectez-vous ici
              </a>
            </p>
        </div>

    </div>
  );
}
export default Inscription;
