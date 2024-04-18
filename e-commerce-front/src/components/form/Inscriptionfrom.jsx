import { Inputhandler } from "../Hooks/Inputhandler";
import { Button } from "../littlecomponent/Button";
import {inscription} from "../Hooks/API";
import { InputBase, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Forminput } from "../littlecomponent/Forminput";
import { Formulaire } from "../littlecomponent/Formulaire";
import { useNavigate } from "react-router-dom";
function Inscription() {
  const navigate = useNavigate();
  const [first_name, setFirst_name, first_namechange] = Inputhandler("");
  const [last_name, setLast_name, last_namechange] = Inputhandler("");
  const [email, setEmail, emailchange] = Inputhandler("");
  const [birthdate, setBirthdate, birthdatechange] = Inputhandler("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [password, setPassword, passwordchange] = Inputhandler("");
   const [showPassword, setShowPassword] = useState(false);
  const formData = {
    first_name: first_name,
    last_name: last_name,
  
    email: email,
    password: password,
    is_staff: true,
    is_superuser: false,
    is_active: true,
    birthdate: birthdate,
  };
  const resetform = () => {
    setFirst_name("");
    setLast_name("");
    setEmail("");
    setBirthdate("");

    setPassword("");
  };

  const inscriptionsubmit = async  (e) => {
    e.preventDefault();
     if (email == "" || password == "" || first_name =="" || last_name == "" || birthdate == "") {
       setErrorMessage(true);
    }
    const responseData = await inscription(formData);
    if (responseData.status == 201) {
      
      console.log("Response:", responseData);
      resetform();
      navigate("/Login");
    } else {
      console.error(error)
    }
  
  };
  return (
    <div className="inscription-container">
      <Formulaire classname="inscription-form">
        <Forminput
          typeinput="text"
          nomlabel="First name"
          value={first_name}
          inputchange={first_namechange}
        />
        <Forminput
          typeinput="text"
          nomlabel="Last name"
          value={last_name}
          inputchange={last_namechange}
        />

        <Forminput
          typeinput="date"
          nomlabel="Birth date"
          value={birthdate}
          inputchange={birthdatechange}
        />

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
        {errorMessage && (
          <div className="text-xs text-red-700">
            Veuiler remplir les champs{" "}
          </div>
        )}
        <Button
          action="Sign up"
          buttonhandle={inscriptionsubmit}
          classname="sign up"
        />
      </Formulaire>
    </div>
  );
}
export default Inscription;
