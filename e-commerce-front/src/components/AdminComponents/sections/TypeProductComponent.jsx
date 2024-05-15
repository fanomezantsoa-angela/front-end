import { useEffect, Fragment } from "react"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import {Inputhandler} from "../../../Hooks/Inputhandler"
import InputBase from "@mui/material/InputBase";
import InputAdornment from "@mui/material/InputAdornment";
import DoneIcon from '@mui/icons-material/Done';

import { apiRequest } from "../../../actions/RequestAction";
import { tokenExtractor } from "../../../actions/tokenExtractor";
import Snackbar from '@mui/material/Snackbar';


export default function TypeProductComponent({action, isActive, data, deleteProps}) {
    

    const [menu, setMenu] = useState(null);
    const [value, setValue, changeValue] = useState("")
    const [designation, setDesignation, changeDesignation] = Inputhandler("")
    const [input, setInput] = useState(false)
    const [snack, setSnack] = useState(false)
    const [snackStyle, setSnackStyle] = useState({ backgroundColor: 'green', color:'white' })
    const [message, setMessage] = useState("Modification effectue avec succes.")
    const [errorSnack, setError] = useState(false)


    const open = Boolean(menu);
    const handleClick = (event) => {
        setMenu(event.currentTarget);
        setDesignation(value)
        console.log()
    };
    const handleClose = () => {
        setMenu(null);
    };

    const handleUpdateOption = () => {
        // order("asc")
        let inputValue = !input
        setInput(inputValue)
        handleClose()
    }

    const handleDeleteOption = async () => {
        const token = tokenExtractor()
        if(token != null) {
            const response = await apiRequest(`type_product/${data.data.id}/`, "DELETE", token)
            
            console.log(response)
            if (response.error == null){
                console.log("Inside Validation****")
                setMessage("Suppression effectue avec succes.")
                setSnack(true)
                deleteProps(data.index)
            } else {
                let snackCustomStyle = snackStyle
                snackCustomStyle.backgroundColor = "grey"
                snackCustomStyle.color = "red"
                setSnackStyle(snackCustomStyle)
                setMessage("Erreur lors de la suppression de la categorie.")
                setDesignation(value)
                setSnack(true)
            }
        }

        handleClose()
    }


    const performAction = () => {
        // alert("Clicked an action button: "+data.index)
        action(data.index)
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        validateUpdate()
    }

    const handleEscape = (e) => {
        console.log("inside escape function")
        if (e.key === "Escape"){
            console.log("Escape validate by key down event.")
            setInput(false)
        } else if(e.key === "Enter"){
            validateUpdate()
        }
    }

    const handleClosedSnack = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnack(false);
    };

    const validateUpdate = async () => {
        let result = {designation: designation}
        const token = tokenExtractor()
        if(token != null) {
            const response = await apiRequest(`type_product/${data.data.id}/`, "PUT", token, result)
            
            console.log(response)
            if (response.error == null){
                console.log("Inside Validation****")
                setSnack(true)
                setValue(designation)
                data.data.designation = designation
            } else {
                let snackCustomStyle = snackStyle
                snackCustomStyle.backgroundColor = "grey"
                snackCustomStyle.color = "red"
                setSnackStyle(snackCustomStyle)
                setMessage("Erreur lors de la modification de la categorie.")
                setDesignation(value)
                setSnack(true)
            }
        }

        setInput(false)
    }

    useEffect(() => {
        console.log("INSIDE COUNTER")
        setValue(data.data.designation)
        console.log(data)
    }, [data])

    return (

        <div className={`w-full rounded-md mb-4 hover:border-slate-400 hover:shadow-md duration-100 p-3 cursor-pointer ${(isActive) ? "border-sky-600 border" : "border-slate-300 border"}`}>
            <div className="flex flex-row justify-between items-center space-x-3">

                {/* Designation section */}
                
                        
                    {(input) ? (
                        // If update mode
                    <Tooltip title="Appuyer sur la touche ENTRE pour valider">
                        <InputBase
                            className="bg-white block w-full rounded-md border-0 py-[3px] text-gray-900 shadow-sm ring-2 ring-inset ring-sky-700 
                            placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-700 sm:text-sm sm:leading-6 px-2"
                            type="text"
                            value={designation}
                            onChange={changeDesignation}
                            onKeyDown={handleEscape}
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton
                                type="button"
                                sx={{ p: "10px" }}
                                aria-label="toggle password visibility"
                                onClick={handleUpdate}
                                >
                                    <DoneIcon />
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                    </Tooltip>
                    ) : (
                    // If text normal mode
                    <div className="w-[100%]">
                        <div onClick={performAction} className="">
                            <span className={`text-lg uppercase ${(isActive) ? "text-sky-800" : ""} hover:underline`}>{value}</span> 
                        </div>
                    </div>
                    )}



                {/* Action section */}
                <button 
                onClick={handleClick}
                className=" flex justify-center bg-slate-100 px-5 py-2 rounded-md hover:bg-slate-200">Action</button>
            </div>


            <Menu
                id="basic-menu"
                anchorEl={menu}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleUpdateOption}>
                    <div className="text-sky-800 w-full">
                        Modifier
                    </div>
                </MenuItem>
                <MenuItem onClick={handleDeleteOption}>
                    <div className="text-red-600 w-full">
                        Supprimer
                    </div>
                </MenuItem>
            </Menu>

            <div>
            <Snackbar
                open={snack}
                autoHideDuration={4000}
                onClose={handleClosedSnack}
                message={message}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                ContentProps={{
                    style:  snackStyle// Set background color using ContentProps
                }}
                action={<Fragment>
  
                    <IconButton
                      size="small"
                      aria-label="close"
                      color="inherit"
                      onClick={handleClosedSnack}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Fragment>}
            />
            </div>
        </div>

    )

}
