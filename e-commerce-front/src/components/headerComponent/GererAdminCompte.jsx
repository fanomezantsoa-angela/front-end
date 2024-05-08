import { useState, useEffect, useContext } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Logout } from "@mui/icons-material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


import { AuthContext } from "../../Hooks/Auth";
import { useNavigate } from "react-router-dom";

function GererAdminCompte() {

  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);
  const { isLoggedIn, setIsLoggedIn, isAdmin, logout } = useContext(AuthContext);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const Logginout = () => {
    logout();
    setIsLoggedIn(false); 
    navigate("/")
  };

  return (
    <div>
      <Tooltip title="Parametre de compte">
        <IconButton
          onClick={handleClick}
          className=" hover:scale-110 hover:bg-sky-50 py-2 rounded-full duration-75"
          color="none"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
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
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AccountBoxIcon className="text-sky-700" />
          </ListItemIcon>
          Profile personnel
        </MenuItem>

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
export default GererAdminCompte;
