import { useState } from "react";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import AccessTimeIcon from '@mui/icons-material/AccessTime';


export default function NotificationContentComponent({notifData}) {

    const [notification, setNotif] = useState([1,2,3])
    const [notificationData, setNotifData] = useState(notifData)


    return (

        <div>
            <div >
                <h2 className={["text-center text-3xl tracking-widest text-white w-full p-3 bg-sky-700"]}>
                    NOTIFICATIONS
                </h2>
            </div>

            <Divider />

            {(notification.length == 0) ? 
            (
                <div className="mt-10 text-slate-400 text-center text-xl p-4">
                    Aucun notification pour l'instant...
                </div>
            ) : (
                <Box 
                sx={{ 
                    width: 400,
                    paddingX: 2,
                    paddingY: 2
                }}
                role="presentation" 
                >
                    <List>
                        {['Inbox', 'Starred', 'Send email'].map((text, index) => (
                        <ListItem 
                        key={index} 
                        disablePadding 
                        alignItems="flex-start"
                        className={["border-b my-5 p-4 hover:bg-slate-100 scale-95 hover:scale-100 duration-75 cursor-pointer shadow", 
                            (notification.length > 2) ? "bg-sky-100" : "bg-slate-50"]
                        }>
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
                                    <p>Votre achat du <span className="text-emerald-700">24 Avril 2024</span>
                                    , a l'adress <span className="text-emerald-700">Mahamasina VF 32</span> 
                                    , sera livree le <span className="text-emerald-700">25 Avril 2025 a 10h30</span></p>
                                </div>
                            </div>
                        </ListItem>
                        ))}

                        <ListItem 
                        disablePadding 
                        alignItems="flex-start"
                        className={["border-b my-5 p-4 hover:bg-slate-100 scale-95 hover:scale-100 duration-75 cursor-pointer shadow", "bg-slate-50"]
                        }>
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
                                    <p>Votre achat du <span className="text-emerald-700">24 Avril 2024</span>
                                    , a l'adress <span className="text-emerald-700">Mahamasina VF 32</span> 
                                    , sera livree le <span className="text-emerald-700">25 Avril 2025 a 10h30</span></p>
                                </div>
                            </div>
                        </ListItem>
                    </List>


                </Box>
            )}

        </div>

    )
}