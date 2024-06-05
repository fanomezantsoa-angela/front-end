import { Button } from "../littlecomponent/Button";
import Tooltip from "@mui/material/Tooltip";
import Drawer from "@mui/material/Drawer";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Badge from "@mui/material/Badge";
import { useState, useEffect } from "react";

import { getAdminNotification } from "../../Hooks/NotificationActionsHandler";
import AdminNotificationContent from "./AdminNotificationContent";

export default function AdminNotificationComponent() {
    const [notification, setNotification] = useState([])
    const [notifDrawer, setDrawer] = useState(false)
    const [notifData, setNotifData] = useState({})

    const fetchAllNotification = async () => {
        let response = await getAdminNotification();
        if (response.res) {
            // response.count = 0
            console.log(response.data.count)
            // response.data.data.map(notif => {
            //     if (!notif.seen) {
            //         response.count++
            //     }
            // })
            setNotification(response.data.count)
            setNotifData(response.data.data)
            console.log(response)
        }
        // else (
        //     console.log(response)
        // )
    }


    useEffect(() => {
        // console.log("Fetch all notification *******")
        fetchAllNotification()
    }, [])

    

    const toggleDrawer = (value) => {
        setDrawer(value)
    }

    function handleDataFromChild() {
        // console.log("Props did work")
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
                        
                        <Badge color="primary" badgeContent={notification} max={10}>
                            {/* <MailIcon /> */}
                            <Tooltip title="Les notifications">
                                {
                                    notification < 1 ?
                                        (
                                            <NotificationsNoneOutlinedIcon sx={{ fontSize: 40, }} className="text-sky-700" />
                                        ) :
                                        (
                                            <NotificationsActiveIcon sx={{ fontSize: 40, }} className="text-sky-700" />
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
                <AdminNotificationContent notifData={notifData} dataSendByChild={handleDataFromChild} refetch={fetchAllNotification} />
            </Drawer>

        </div>
    );
}

