import { Forminput } from "../littlecomponent/Forminput";
import { Formulaire } from "../littlecomponent/Formulaire";
import { Inputhandler } from "../Hooks/Inputhandler";
import { Button } from "../littlecomponent/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { login} from "../Hooks/API";
function Loginform() {
  const navigate = useNavigate();
  const [email, setEmail, emailchange] = Inputhandler("");
  const [password, setPassword, passwordchange] = Inputhandler("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const formData = {
    email: email,
    password: password,
  };
  const loginsubmit = async (e) => {
    e.preventDefault();
    try {
      const responseData = await login(formData);
      localStorage.setItem("jwt-token", responseData.token);
      setIsLoggedIn(true);
      setEmail("");
      setPassword("");
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
