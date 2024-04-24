import { useState, Fragment } from "react";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import CloseOutlined from '@mui/icons-material/CloseOutlined';


export default function NotificationContentComponent({dataSendByChild}) {

const closeDrawer = () => {
    dataSendByChild(false)  
}

    return (

        <div>
            {/* <p onClick={closeDrawer}
            className="text-right p-4 text-2xl"
            >
                <CloseOutlined
                sx={{ fontSize: 40 }}
                className="text-red-700 hover:text-white hover:bg-red-500 duration-75 rounded-lg" />
            </p> */}
            {/* Content header */}
            <div >
                <h2 className="text-center text-3xl tracking-widest text-white w-full p-3 bg-sky-700">
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
                    className="">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <p>{text}</p>
                        
                        <ListItemText
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
          }
        />

                    </ListItem>
                    ))}
                </List>


                {/* <Divider className="mt-10"/> */}
                {/* <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                    ))}
                </List> */}
            </Box>

        </div>

    )
}