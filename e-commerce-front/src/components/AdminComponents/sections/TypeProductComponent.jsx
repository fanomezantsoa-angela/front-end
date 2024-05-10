import { useEffect } from "react"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';



export default function TypeProductComponent({action, isActive, data}) {
    

    const [menu, setMenu] = useState(null);
    const open = Boolean(menu);
    const handleClick = (event) => {
        setMenu(event.currentTarget);
    };
    const handleClose = () => {
        setMenu(null);
    };

    const handleAscendingOrder = () => {
        // order("asc")
        handleClose()
    }

    const handleDescendingOrder = () => {
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

    useEffect(() => {
        console.log("INSIDE COUNTER")
        console.log(data)
    }, [])

    return (

        <div className={`w-full rounded-md mb-4 hover:border-slate-400 hover:shadow-md duration-100 p-3 cursor-pointer ${(isActive) ? "border-sky-600 border" : "border-slate-300 border"}`}>
            {/* Designation section */}
            <div className="mb-2">
                {/* <p>{data}</p> */}
                <span className="text-lg uppercase">{data.data.designation}</span> 
            </div>


            {/* Action section */}
            <button 
            onClick={handleClick}
            className="w-full flex justify-center bg-slate-100 p-1 rounded-md hover:bg-slate-200">Action</button>
            <Menu
                id="basic-menu"
                anchorEl={menu}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleAscendingOrder}>
                    <div>
                        <span><EditIcon className="text-sky-500"/></span>
                        <span>Modififer</span>
                    </div>
                </MenuItem>
                <MenuItem onClick={handleDescendingOrder}>Par ordre decroissant</MenuItem>
            </Menu>
        </div>

    )

}
