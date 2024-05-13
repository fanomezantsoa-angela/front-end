import { useEffect } from "react"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import {Inputhandler} from "../../../Hooks/Inputhandler"
import InputBase from "@mui/material/InputBase";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import DoneIcon from '@mui/icons-material/Done';


export default function TypeProductComponent({action, isActive, data}) {
    

    const [menu, setMenu] = useState(null);
    const [designation, setDesignation, changeDesignation] = Inputhandler("")
    const [input, setInput] = useState(false)


    const open = Boolean(menu);
    const handleClick = (event) => {
        setMenu(event.currentTarget);
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

    const handleDeleteOption = () => {
        // order("desc")
        handleClose()
    }


    const performAction = () => {
        alert("Clicked an action button: "+data.index)
        action({
            action: "action",
            index: data.index
        })
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        validateUpdate()
    }

    const handleEscape = (e) => {
        console.log("inside escape function")
        if (e.key === "Escape"){
            console.log("Escape validate by key down event.")
        } else if(e.key === "Enter"){
            validateUpdate()
        }
    }

    const validateUpdate = () => {
        alert("You just performed an updated operation")
        setInput(false)
    }

    useEffect(() => {
        console.log("INSIDE COUNTER")
        setDesignation(data.data.designation)
        console.log(data)
    }, [])

    return (

        <div className={`w-full rounded-md mb-4 hover:border-slate-400 hover:shadow-md duration-100 p-3 cursor-pointer ${(isActive) ? "border-sky-600 border" : "border-slate-300 border"}`}>
            <div className="flex flex-row justify-between items-center space-x-3">

                {/* Designation section */}
                
                        
                    {(input) ? (
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
                    <div className="w-[100%]">
                        <div onClick={performAction} className="">
                            <span className={`text-lg uppercase ${(isActive) ? "text-sky-800" : ""} hover:underline`}>{data.data.designation}</span> 
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
        </div>

    )

}
