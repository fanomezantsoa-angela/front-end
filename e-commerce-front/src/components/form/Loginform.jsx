import { Forminput } from "../littlecomponent/Forminput";
import { Formulaire } from "../littlecomponent/Formulaire";
import { Inputhandler } from "../Hooks/Inputhandler";
import { Button } from "../littlecomponent/Button";
import { useState, useEffect, useContext } from "react";
import { login } from "../Hooks/API";
import { AuthContext } from "../Hooks/Auth";

import { useNavigate } from "react-router-dom";
function Loginform({  }) {
   const { setIsLoggedIn } = useContext(AuthContext);
  const [email, setEmail, emailchange] = Inputhandler("");
  const [password, setPassword, passwordchange] = Inputhandler("");

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
       navigate("/");
     
      
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <Formulaire classname="login-form">
        <Forminput
          typeinput="email"
          nomlabel="Email"
          value={email}
          inputchange={emailchange}
        />
        <Forminput
          typeinput="password"
          nomlabel="Password"
          value={password}
          inputchange={passwordchange}
        />

        <Button action="Login" buttonhandle={loginsubmit} classname="login" />
      </Formulaire>
    </div>
  );
}
export default Loginform;
