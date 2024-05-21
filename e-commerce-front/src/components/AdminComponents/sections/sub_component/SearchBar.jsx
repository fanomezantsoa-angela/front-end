import { IconButton, InputAdornment, InputBase } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { Inputhandler } from "../../../../Hooks/Inputhandler";


export default function SearchBar() {

    const [value, setValue, changeValue] = Inputhandler("")

    const submitSearch = (e) => {
        e.preventDefault()
        console.log("Search submited ")
    }

    function showPressButton(e) {
        console.log("Button pressed")
    }

    return (

        <div className="flex flex-center justify-center pl-3">
            <InputBase
            value={value}
            onChange={changeValue}
            onKeyDown={showPressButton}
            placeholder="Chercher..."
            className="bg-slate-50 block w-full rounded-full border-0 py-[4px] pl-5 pr-1 text-gray-900 shadow-gray-100  ring-2 ring-inset ring-slate-400 
            placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-700 sm:text-sm sm:leading-6
            hover:ring-sky-800 duration-75"
            inputProps={{ "aria-label": "chercher un produit" }}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        type="button"
                        aria-label="recherche"
                        onClick={submitSearch}
                    >
                        {/* Icon */}
                        <SearchIcon />
                    </IconButton>
                </InputAdornment>
            }
            />
      </div>
    )

}