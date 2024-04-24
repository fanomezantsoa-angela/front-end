import { useState, Fragment } from "react";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import CloseOutlined from '@mui/icons-material/CloseOutlined';


export default function NotificationContentComponent({dataSendByChild}) {

    const [notification, setNotif] = useState([1,1,1,1,1])

    const closeDrawer = () => {
        dataSendByChild(false)  
    }

    return (

        <div>
            <div >
                <h2 className={["text-center text-3xl tracking-widest text-white w-full p-3 bg-sky-700"]}>
                    NOTIFICATION
                </h2>
            </div>

            <Divider />
            
            <Box 
            sx={{ 
                width: 400,
                paddingX: 2,
                paddingY: 2
             }}
            role="presentation" 
            >
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem 
                    key={index} 
                    disablePadding 
                    alignItems="flex-start"
                    className={["border-b my-5 p-4 hover:bg-slate-100 duration-75 cursor-pointer shadow", 
                        (notification.length > 0) ? "bg-sky-100" : "bg-white"]
                    }>
                        {/* <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar> */}
                        {/* <p>{text}</p> */}

                        
                        {/* <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                            <Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Ali Connors
                                </Typography>
                            {" — I'll be in your neighborhood doing errands this…"}
                            </Fragment>
                        }/> */}

                        <div className="space-y-2">
                            {/* Date section */}
                            <div className="flex flex-row justify-end items-center space-x-3 ">
                                <p className="text-slate-500">24 Avril 2024 </p>
                                <span className="text-emerald-600">
                                    <AccessTimeIcon 
                                    sx={{ fontSize: 25 }} 
                                    />
                                </span>
                            </div>

                            {/* Type of notification */}
                            <div>
                                <span className="bg-sky-200 text-white rounded-full px-4 py-2">
                                Livraison
                                </span>
                            </div>

                            {/* Information section */}
                            <div>
                                <p>Votre achat du <span>24 Avril 2024</span> a l'adress <span>Mahamasina VF 32</span> sera livree le <span>25 Avril 2025 a 10h30</span></p>
                            </div>
                        </div>
                    </ListItem>
                    ))}
                </List>


            </Box>
        </div>

    )
}