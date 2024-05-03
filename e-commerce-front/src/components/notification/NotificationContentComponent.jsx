import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { fr } from "date-fns/locale";
import { formatDistanceToNow, format } from "date-fns";
import { mark_as_seen } from "../../Hooks/NotificationActionsHandler";
import { useNavigate } from "react-router-dom";


export default function NotificationContentComponent({notifData, refetch}) {

    const navigate = useNavigate()
    const [notificationData, setNotifData] = useState(notifData)
    const [counter, setCounter] = useState(0)
    
    // Date formating to a more human readable format

    const regularTimeFormat = (date) => {
        const customFormat = "d MMMM yyyy 'à' HH'h'mm";
        return format(date, customFormat, {locale: fr})
    }

    const formatTimeDifference = (date) => {
        const formattedDate = new Date(date);
        return formatDistanceToNow(formattedDate, { locale: fr, addSuffix: true });
      };

    // Set counters
    function countUnseen(){
        notificationData.map(notif => {
            if( !notif.seen && (notif.type == "livraison") ) {
                let number = counter
                setCounter(number++)
            }
        })
    }

    async function markThis(index) {
        const response = await mark_as_seen(notificationData[index].id)
        console.log(response)
        if (response.res){
            notificationData[index].seen = false
            console.log("force refetch")

            await refetch()
            setNotifData(notifData)

            navigate("/")
        } else {
            alert("Erreur de l'operation")
        }
    }

    useEffect(() => {
        countUnseen()
    })


    return (

        <div>
            <div >
                <h2 className={["text-center text-3xl tracking-widest text-white w-full p-3 bg-sky-700"]}>
                    NOTIFICATIONS
                </h2>
            </div>

            <Divider />

            {(notificationData.length == 0) ? 
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
                        {notificationData.map((notif, index) => (
                        (notif.type == "livraison") && (
                            <ListItem 
                        key={index} 
                        disablePadding 
                        alignItems="flex-start"
                        onClick={() => markThis(index)}
                        className={`border-b my-5 p-4 hover:bg-slate-100 scale-95 hover:scale-100 duration-75 cursor-pointer shadow ${( !notif.seen ) ? "bg-sky-100" : "bg-slate-50"}`
                        }>
                            <div className="space-y-2">
                                {/* Date section */}
                                <div className="flex flex-row justify-end items-center space-x-3 ">
                                    <p className="text-slate-500">{formatTimeDifference(notif.created_at)}</p>
                                    <span className="text-emerald-600">
                                        <AccessTimeIcon 
                                        sx={{ fontSize: 25 }}   
                                        />
                                    </span>
                                </div>

                                {/* Type of notification */}
                                <div>
                                    <span className="bg-sky-200 text-white rounded-full px-4 py-2">
                                    {notif.type}
                                    </span>
                                </div>

                                {/* Information section */}
                                <div>
                                    <p>Votre achat <span className="text-emerald-700">{formatTimeDifference(notif.purchase_details.date)}</span>
                                    , a l'adress <span className="text-emerald-700">{(notif.purchase_details.address != null) ? notif.purchase_details.address : "inconnu"}</span> 
                                    , sera livree <span className="text-emerald-700">{(notif.purchase_details.delivery_date != null) ? formatTimeDifference(notif.purchase_details.delivery_date) : "a une date non precise inconnue"}</span></p>
                                </div>
                            </div>
                        </ListItem>
                        ) 
                        
                        ))}

                        
                    </List>


                </Box>
            )}

        </div>

    )
}