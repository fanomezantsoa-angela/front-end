import { useState, useEffect, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Logout } from "@mui/icons-material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


import { AuthContext } from "../../Hooks/Auth";
import { useNavigate } from "react-router-dom";
import { colors } from "@mui/material";
function GererCompte() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate()

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    console.log(isAdmin)
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    
    setAnchorEl(null);
  };
  const Logginout = () => {
    logout();
   
    navigate("/")
  };
  

  const goToAdminPanel = () => {
    
    navigate("/Admin")
  }
  const goToProfil = () => {
    navigate("/Profil")
  }

  return (
    <div>
      <Tooltip title="Parametre de compte">
        <IconButton
          onClick={handleClick}
          className=" m-0 hover:scale-110 hover:bg-sky-50 px-3 py-2 rounded-full duration-75"
          color="none"
          sx={{ ml: 2 }}
      
          aria-haspopup="true"
        
        >
          <AccountCircleOutlinedIcon
            sx={{ fontSize: 40 }}
            className="text-sky-700"
          />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={goToProfil}>
          <ListItemIcon>
            <AccountBoxIcon onClick="" className="text-sky-700" />
          </ListItemIcon>
          Profile personnel
        </MenuItem>

        {isAdmin &&
          <MenuItem onClick={goToAdminPanel}>
            <ListItemIcon>
              <LockPersonIcon className="text-sky-700" />
            </ListItemIcon>
            Pannaux d'administration
          </MenuItem>
        }

        <MenuItem onClick={Logginout}>
          <ListItemIcon>
            <Logout className="text-sky-700" />
          </ListItemIcon>
          Déconnexion
        </MenuItem>
      </Menu>
    </div>
  );
}
export default GererCompte;
