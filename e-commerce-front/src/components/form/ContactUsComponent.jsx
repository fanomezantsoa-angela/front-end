import { Forminput } from "../littlecomponent/Forminput"
import { Inputhandler } from "../../Hooks/Inputhandler";
import { Button } from "../littlecomponent/Button";
import { useState, useContext } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import SendIcon from '@mui/icons-material/Send';
import Box from "@mui/material/Box";
import Swal from "sweetalert2";
import { LoadingContext } from "../../Hooks/LoadingContext";
import { createContact } from "../../actions/ContactActions";

function ContactUsComponent()  {
    // State declaration
    const [name, setName, nameChange] = Inputhandler("");
    const [email, setEmail, emailChange] = Inputhandler("");
    const [message, setMessage, messageChange] = Inputhandler("");
    const { loading, startLoading, stopLoading } = useContext(LoadingContext);
    const [emailError, setEmailError] = useState("")

    const emailValidationWithRegex = (email) => {
        const validation =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return validation.test(email);
      };

    const resetForm = () => {
        setEmailError(false)
        setName("")
        setEmail("")
        setMessage("")

    }


    const sendContact = async (e) => {
        e.preventDefault()

        if(emailValidationWithRegex(email)) {
            resetForm()

            console.log("Message send successfully")
            const data = {
                name: name,
                email: email,
                text: message
            }
            console.log(data)

            const response = await createContact(data)
            console.log(response)

            if (!response.res){
                if (response.error == null) { 
                    Swal.fire({
                        title: "Attention",
                        text: "Veuiller vous authentifier avant de proceder a la soumission de la requete.",
                        icon: "warning"
                    });        
                } else {
                    Swal.fire({
                        title: "Une erreur est survenu.",
                        text: response.error,
                        icon: "error"
                    });
                }
            } else {
                Swal.fire({
                    title: "Succes!",
                    text: "Votre requete a bien ete envoye. Merci pour votre cooperation !",
                    icon: "success"
                });
            }


        } else {

            setEmailError(true)

        }

    }
    
    return (

        <div>
            <form className="w-full space-y-2">
                <div className="flex flex-row flex-wrap justify-between items-center">
                    <div className="w-[100%] md:w-[47%]">
                        {/* Username or company input */}
                        <Forminput
                            typeinput="text"
                            nomlabel="*Votre nom ou celui de votre companie"
                            value={name}
                            // hasPlaceholder={}
                            inputchange={nameChange}
                            isRequired={true}
                        />
                    </div>
                    
                    <div className="w-[100%] md:w-[47%]">
                        {/* Email input */}
                        <Forminput
                            typeinput="email"
                            nomlabel="*votre address e-mail"
                            value={email}
                            hasPlaceholder={"email@exemple.com"}
                            inputchange={emailChange}
                            isRequired={true}
                        />
                        <p className="p-0 m-0 text-red-500">
                            {emailError && "Veuiller verifier que l'email saisi contient les caracteres aux normes pour un address e-mail."}
                        </p>
                    </div>
                </div>


                <div>
                    {/* Message input */}
                    {/* <Forminput
                        typeinput="email"
                        nomlabel="Address e-mail"
                        value={email}
                        hasPlaceholder={"email@exemple.com"}
                        inputchange={emailchange}
                        isRequired={true}
                    /> */}
                    <label 
                        className="block text-sm font-medium leading-6 text-gray-900">
                        *Votre message
                    </label> 
                    <TextareaAutosize 
                        placeholder="Raconter-nous vos envies..."
                        value={message}
                        onChange={messageChange}
                        className="block bg-white mb-6 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-sky-700 
                        placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-700 sm:text-sm sm:leading-6 px-2 placeholder:text-end"
                        minRows={4}
                        maxRows={25}
                    />
                </div>

                
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
                            <div className="flex flex-row justify-center space-x-6">
                                <span >
                                    Soumettre
                                </span>
                                <span>
                                    <SendIcon />
                                </span>
                            </div>
                        )
                        }
                        // action={

                        // }
                        buttonhandle={sendContact}
                        classname="bg-sky-700 text-white w-full p-2 rounded-md
                        hover:bg-sky-600 ease-in-out duration-75"
                    />
                </div>

            </form>
        </div>

    );
}


export default ContactUsComponent