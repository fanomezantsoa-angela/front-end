import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function FilterComponent({order}) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAscendingOrder = () => {
        order("asc")
        handleClose()
    }

    const handleDescendingOrder = () => {
        order("desc")
        handleClose()
    }


    return (

        <div>
            <div  onClick={handleClick}
            className='bg-slate-200 rounded-full px-3 py-2 hover:bg-slate-300 duration-100 cursor-pointer h-full relative'>
                <Tooltip title="FIlter les elements">
                    <div className='flex flex-row justify-center items-center'>    
                        <FilterListIcon sx={{fontSize: 25}} className=""/>
                        <div className='px-1'>Trier</div>  
                    </div>
                </Tooltip>
            </div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleAscendingOrder}>Par ordre croissant</MenuItem>
                <MenuItem onClick={handleDescendingOrder}>Par ordre decroissant</MenuItem>
            </Menu>
        </div>

    )

}