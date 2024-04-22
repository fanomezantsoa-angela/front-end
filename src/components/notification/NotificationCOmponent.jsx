// All logical part of the application
// MUI Stuff
import { Button } from "../littlecomponent/Button";
import Modal from "@mui/material/Modal";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Badge from '@mui/material/Badge';
import { useState, useEffect, useContext } from "react";



function NotificationComponent() {
    // Reactive var setter
    const [notification, setNotification] = useState([])
    const openNotifModal = () => setNotification(true)
    const closeNotifModal = () => setNotification(false)


    return (
        <div>   
            <section>
                <Button
                    classname="hover:bg-sky-50 hover:bg-sky-100 hover:scale-110 px-3 py-2 rounded-full duration-75"
                    aria-label="panier"
                    buttonhandle={openNotifModal}
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

            {/* <Modal
            open={notification}
            onClose={closeNotifModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box className="paniers">
                    {items.length < 1 ? (
                    <p>No items in your cart</p>
                    ) : (
                    <Paniers panierClose={closeNotifModal} />
                    )}
                </Box>
            </Modal> */}

        </div>
    )
}

export default NotificationComponent
