import { Button } from "../littlecomponent/Button";
import Tooltip from "@mui/material/Tooltip";
import Drawer from "@mui/material/Drawer";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Badge from '@mui/material/Badge';
import { useState, useEffect } from "react";

import { getClientNotification } from "../../Hooks/NotificationActionsHandler";
import NotificationContentComponent from "./NotificationContentComponent";


function NotificationComponent() {
    // Reactive var setter
    const [notification, setNotification] = useState([])
    const [notifDrawer, setDrawer] = useState(false)
    const [notifData, setNotifData] = useState({})

    const fetchAllNotification = async () => {
        let response = await getClientNotification()
        if ( response.res ){
            // console.log("Inside notification fetcher")
            response.count = 0

            response.data.map(notif => {
                if( !notif.seen && (notif.type == "livraison")) {
                    response.count++
                }
            })
            setNotification(response)
            setNotifData(response.data)
            // console.log(response)
        } 
        // else (
        //     console.log(response)
        // )
    }


    useEffect(() => {
        fetchAllNotification()
    }, [])

    

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

                    <Badge color="primary" badgeContent={notification.count} max={10}>
                    {/* <MailIcon /> */}
                        <Tooltip title="Les notifications">
                            {
                                notification.count < 1 ? 
                                (
                                    <NotificationsNoneOutlinedIcon sx={{fontSize: 40,}} className="text-sky-700"/>
                                ) : 
                                (
                                    <NotificationsActiveIcon sx={{fontSize: 40,}} className="text-sky-700"/>
                                )
                            }
                        </Tooltip>
                    </Badge>
                    
                }
                ></Button>
            </section>
                

            {/* Drawer for notification modal */}
            <Drawer 
            anchor="right"
            open={notifDrawer} 
            onClose={() => toggleDrawer(false)}>
                <NotificationContentComponent notifData={notifData} dataSendByChild={handleDataFromChild} refetch={fetchAllNotification} />
            </Drawer>

        </div>
    )
}

export default NotificationComponent
