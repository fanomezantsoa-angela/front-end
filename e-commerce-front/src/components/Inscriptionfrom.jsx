import { Inputhandler } from "../Hooks/Inputhandler";
import { Button } from "../littlecomponent/Button";
import {inscription} from "../Hooks/API";
import { useNavigate } from "react-router-dom";
import { Forminput } from "../littlecomponent/Forminput";
import { Formulaire } from "../littlecomponent/Formulaire";
function Inscription() {
    const navigate = useNavigate();
  const [first_name, setFirst_name, first_namechange] = Inputhandler("");
  const [last_name, setLast_name, last_namechange] = Inputhandler("");
  const [email, setEmail, emailchange] = Inputhandler("");
  const [birthdate, setBirthdate, birthdatechange] =
    Inputhandler("");
 // const [contact, setContact, contactchange] = Inputhandler("");
 const [password, setPassword, passwordchange] = Inputhandler("");
    const formData = {
      first_name: first_name,
      last_name: last_name,
      // contact: contact,
      email: email,
      password: password,
      is_staff: true,
      is_superuser: true,
      birthdate: birthdate
    };
    const resetform = () => {
      setFirst_name("");
      setLast_name("");
      setEmail("");
      setBirthdate("");
     
        setPassword("");
    };

  const inscriptionsubmit = async (e) => {
    e.preventDefault();
    try {
      const responseData = await inscription(formData);
        console.log("Response:", responseData);
        resetform()
         navigate("/login");
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
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
        <Forminput
          typeinput="password"
          nomlabel="Password"
          value={password}
          inputchange={passwordchange}
        />

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
