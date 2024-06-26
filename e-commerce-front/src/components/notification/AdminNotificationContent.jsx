import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { fr } from "date-fns/locale";
import { formatDistanceToNow, format } from "date-fns";
import { mark_as_seen } from "../../Hooks/NotificationActionsHandler";
import { useNavigate } from "react-router-dom";

export default function AdminNotificationContent({ notifData, refetch }) {
  const navigate = useNavigate();
  const [notificationData, setNotifData] = useState(notifData);
  const [counter, setCounter] = useState(0);

  // Date formating to a more human readable format

  const regularTimeFormat = (date) => {
    const customFormat = "d MMMM yyyy 'à' HH'h'mm";
    return format(date, customFormat, { locale: fr });
  };

  const formatTimeDifference = (date) => {
    const formattedDate = new Date(date);
    return formatDistanceToNow(formattedDate, { locale: fr, addSuffix: true });
  };

  // Set counters
  function countUnseen() {
    notificationData.map((notif) => {
      // if (!notif.seen && notif.type != "livraison") {
      let number = counter;
      setCounter(number++);
      // }
    });
    // console.log("Count notif data*********")
    // console.log(notificationData.length)
  }

  async function markThis(index) {
    const response = await mark_as_seen(notificationData[index].id);
    console.log(response);
    if (response.res) {
      notificationData[index].seen = false;
      console.log("force refetch");

      await refetch();
      setNotifData(notifData);
      console.log(notifData);
      
    } else {
      alert("Erreur de l'operation");
    }
  }

  function formatMessage(date) {
    if (date != null) {
      const today = new Date();
      const delivery = new Date(date);
      const todayInMilisec = today.getTime();

      return delivery > todayInMilisec ? "sera livrée" : "a été livrée";
    }

    return "à une date non précisée inconnue";
  }

  useEffect(() => {
    countUnseen();
  });

  return (
    <div>
      <div>
        <h2
          className={[
            "text-center text-3xl tracking-widest text-white w-full p-3 bg-sky-700",
          ]}
        >
          NOTIFICATIONS
        </h2>
      </div>

      <Divider />

      {notificationData.length == 0 ? (
        <div className="mt-10 text-slate-400 text-center text-xl p-4">
          Aucun notification pour l'instant...
        </div>
      ) : (
        <Box
          sx={{
            width: 400,
            paddingX: 2,
            paddingY: 2,
          }}
          role="presentation"
        >
          <List>
            {notificationData.map((notif, index) =>
              notif.type == "achat" ? (
                <ListItem
                  key={index}
                  disablePadding
                  alignItems="flex-start"
                  onClick={() => markThis(index)}
                  className={`border-b my-5 p-4 hover:bg-slate-100 scale-95 hover:scale-100 duration-75 cursor-pointer shadow ${
                    !notif.seen ? "bg-sky-100" : "bg-slate-50"
                  }`}
                >
                  <div className="space-y-2">
                    {/* Date section */}
                    <div className="flex flex-row justify-end items-center space-x-3 ">
                      <p className="text-slate-500">
                        {formatTimeDifference(notif.created_at)}
                      </p>
                      <span className="text-emerald-600">
                        <AccessTimeIcon sx={{ fontSize: 25 }} />
                      </span>
                    </div>

                    {/* Type of notification */}
                    <div>
                      <span className="bg-emerald-700 text-white rounded-full px-4 py-2">
                        {notif.type}
                      </span>
                    </div>

                    {/* Information section */}
                    <div className="mt-4">
                      <p className="mt-4">
                        Une commande a été le{" "}
                        <span className="text-emerald-700">
                          {formatTimeDifference(notif.purchase_details.date)}
                        </span>
                        , dans la ville{" "}
                        <span className="text-emerald-700">
                          {notif.purchase_details.ville != null
                            ? notif.purchase_details.ville
                            : "inconnu"}
                        </span>
                        , a l'adresse{" "}
                        <span className="text-emerald-700">
                          {notif.purchase_details.address != null
                            ? notif.purchase_details.address
                            : "inconnu"}
                        </span>
                        , {formatMessage(notif.purchase_details.delivery_date)}{" "}
                        <span className="text-emerald-700">
                          {notif.purchase_details.delivery_date != null &&
                            notif.purchase_details.delivery_date}{" "}
                          formatTimeDifference
                        </span>
                      </p>
                    </div>
                  </div>
                </ListItem>
              ) : (
                <ListItem
                  key={index}
                  disablePadding
                  alignItems="flex-start"
                  onClick={() => markThis(index)}
                  className={`border-b my-5 p-4 hover:bg-slate-100 scale-95 hover:scale-100 duration-75 cursor-pointer shadow ${
                    !notif.seen ? "bg-sky-100" : "bg-slate-50"
                  }`}
                >
                  <div>
                    {/* Date section */}
                    <div className="flex flex-row justify-end items-center space-x-3 ">
                      <p className="text-slate-500">
                        {formatTimeDifference(notif.created_at)}
                      </p>
                      <span className="text-emerald-600">
                        <AccessTimeIcon sx={{ fontSize: 25 }} />
                      </span>
                    </div>
                    <div>
                      <span className="bg-sky-600 text-white rounded-full px-4 py-2 mb-4">
                        {notif.type}
                      </span>
                    </div>
                    <div className="mt-4">
                      Un nouveau contact entrant le{" "}
                      <span className="text-emerald-700">
                        {regularTimeFormat(notif.created_at)}
                      </span>
                    </div>
                  </div>
                </ListItem>
              )
            )}
          </List>
        </Box>
      )}
    </div>
  );
}
