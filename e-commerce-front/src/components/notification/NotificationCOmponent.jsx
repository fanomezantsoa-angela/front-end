import { Button } from "../littlecomponent/Button";
import Drawer from "@mui/material/Drawer";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Badge from '@mui/material/Badge';
import { useState } from "react";

import NotificationContentComponent from "./NotificationContentComponent";


function NotificationComponent() {
    // Reactive var setter
    const [notification, setNotification] = useState([])
    const [notifDrawer, setDrawer] = useState(false)

    // const openNotifModal = () => setNotification(true)
    // const closeNotifModal = () => setNotification(false)

    const toggleDrawer = (value) => {
        setDrawer(value)
    }

    function handleDataFromChild() {
        console.log("Props did work")
        setDrawer(false);
     }

    


    return (
        <div>   
            <section>
                <Button
                    classname="bg-sky-50 hover:bg-sky-100 hover:scale-110 px-3 py-2 rounded-full duration-75"
                    aria-label="panier"
                    buttonhandle={() => toggleDrawer(true)}
                    action={

                    <Badge color="primary" badgeContent={notification.length} max={10}>
                    {/* <MailIcon /> */}
                    {
                        notification.length < 1 ? 
                        (
                            <NotificationsNoneOutlinedIcon sx={{fontSize: 40,}} className="text-sky-700"/>
                        ) : 
                        (
                            <NotificationsActiveIcon sx={{fontSize: 40,}} className="text-sky-700"/>
                        )
                    }
                    </Badge>
                    
                }
                ></Button>
            </section>
                

            {/* Drawer for notification modal */}
            <Drawer 
            anchor="right"
            open={notifDrawer} 
            onClose={() => toggleDrawer(false)}>
                <NotificationContentComponent dataSendByChild={handleDataFromChild} />
            </Drawer>

        </div>
    )
}

export default NotificationComponent
