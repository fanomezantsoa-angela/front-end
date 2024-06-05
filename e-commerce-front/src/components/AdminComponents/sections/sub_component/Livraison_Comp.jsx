import { useEffect, useState } from "react";
import { achats, achats_validation } from "../../../../Hooks/AchatApi";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import InputAdornment from "@mui/material/InputAdornment";
import DoneIcon from "@mui/icons-material/Done";
import Snackbar from "@mui/material/Snackbar";

export const Livraison_Comp = () => {
  const [date, setDate] = useState("");
  const [inputachats, setInputachats] = useState([]);
  const [listachats, setListachats] = useState([]);

  const handleUpdateOption = (index) => {
    const newInputachats = [...inputachats];
    newInputachats[index] = !newInputachats[index]; // Toggle state for clicked purchase
    setInputachats(newInputachats);
  };

  const handleEscape = (e) => {
    if (e.key === "Escape") {
      setInputachats(Array(listachats.length).fill(false));
    }
  };

  const handlevalidation = async (id, index) => {
    const data = { date: date };
    const validationres = await achats_validation(id, data);
    if (validationres.response) {
      console.log(validationres.response);
      // Update the delivery date for the specific purchase in the state
      const newListachats = [...listachats];
      newListachats[index].delivery_date = date;
      setListachats(newListachats);
      setInputachats(Array(listachats.length).fill(false)); // Close all input fields
      getAchats();
    } else {
      console.log(validationres.err);
      setInputachats(Array(listachats.length).fill(false));
    }
    
  };

  function formatDate(dateString) {
    if (dateString) {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      // Pad single digit day/month with leading zero
      const formattedDay = day < 10 ? `0${day}` : day;
      const formattedMonth = month < 10 ? `0${month}` : month;

      return `${formattedDay}/${formattedMonth}/${year}`;
    } else {
      return "/ / ";
    }
  }

  const getAchats = async () => {
    const achatresponse = await achats();
    if (achatresponse.response) {
      setListachats(achatresponse.response.data.results);
      setInputachats(
        Array(achatresponse.response.data.results.length).fill(false)
      ); // Initialize inputachats state
    } else {
      console.log(achatresponse.err);
    }
  };

  useEffect(() => {
    getAchats();
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      <div>
        <span
          className="w-50
          mb-8
          text-center
          uppercase
          bg-sky-500
          px-12
          py-2.5
          text-white
          rounded-full
          m-"
        >
          Livraison
        </span>
      </div>
      <div className="w-4/5 my-7">
        <TableContainer component={Paper} sx={{ top: "180px" }}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Mode de paiement</TableCell>
                <TableCell>Ville</TableCell>
                <TableCell>Etat</TableCell>
                <TableCell>Validation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listachats.map((achat, index) => (
                <TableRow key={index}>
                  <TableCell>{formatDate(achat.date)}</TableCell>
                  <TableCell>{achat.payement_mode}</TableCell>
                  <TableCell>{achat.ville}</TableCell>
                  <TableCell
                    class={
                      achat.is_delivered ? "text-green-600" : "text-orange-600"
                    }
                  >
                    {achat.is_delivered ? "livré" : "non livré"}
                  </TableCell>
                  <TableCell>
                    {inputachats[index] ? (
                      // If update mode
                      <Tooltip title="Appuyer sur la touche ENTRE pour valider">
                        <InputBase
                          className="bg-white block w-full rounded-md border-0 py-[3px] text-gray-900 shadow-sm ring-2 ring-inset ring-sky-700 
                            placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-700 sm:text-sm sm:leading-6 px-2"
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                type="button"
                                sx={{ p: "10px" }}
                                aria-label="validate delivery date"
                                onClick={() =>
                                  handlevalidation(
                                    achat.orders[0].purchase,
                                    index
                                  )
                                }
                              >
                                <DoneIcon />
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </Tooltip>
                    ) : (
                      <>
                        {achat.delivery_date == null ? (
                          <Button onClick={() => handleUpdateOption(index)
                            
                          }>
                            Valider
                          </Button>
                        ) : (
                          <>
                            {"livré le"} {formatDate(achat.delivery_date)}
                          </>
                        )}
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};
