import { useEffect, useState } from "react"
import { achats, achats_validation } from "../../../../Hooks/AchatApi"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Inputhandler } from "../../../../Hooks/Inputhandler";
export const Livraison_Comp = () => {
  const [date, setDate, changeDate] = Inputhandler("");
   const [input, setInput] = useState(false);
     const handleUpdateOption = () => {
       // order("asc")
       let inputValue = !input;
       setInput(inputValue);
       
  };
  const handlevalidation = async(id) => {
    const validationres = await achats_validation()
    if (validationres.res) {
      console.log(validationres.response);
    } else {
      console.log(achatresponse.err);
    }
  }
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
    const [listachats, setListchats] = useState([])
    const getAchats = async () => {
        const achatresponse = await achats();
        if (achatresponse.response) {
            console.log(achatresponse.response.data.results)
            setListchats(achatresponse.response.data.results);
      }
        else {
          console.log(achatresponse.err)
      }
    }
    useEffect(() => {

        getAchats()
        
    }, [])
     useEffect(() => {
       console.log(listachats, "--------")
     }, [listachats]);
    
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
                  <TableCell>mode de payement </TableCell>
                  <TableCell> Ville </TableCell>

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
                        achat.is_delivered
                          ? "text-green-600"
                          : "text-orange-600"
                      }
                    >
                      {achat.is_delivred ? "livré" : "non livré"}
                    </TableCell>
                    <TableCell>
                      {input ? (
                        // If update mode
                        <Tooltip title="Appuyer sur la touche ENTRE pour valider">
                          <InputBase
                            className="bg-white block w-full rounded-md border-0 py-[3px] text-gray-900 shadow-sm ring-2 ring-inset ring-sky-700 
                            placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-700 sm:text-sm sm:leading-6 px-2"
                            type="date"
                            value={date}
                            onChange={changeDate}
                            
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  type="button"
                                  sx={{ p: "10px" }}
                                  aria-label="toggle password visibility"
                                  onClick={handlevalidation(achat.orders[0].purchase)}
                                >
                                  <DoneIcon />
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </Tooltip>
                      ) : (
                        <Button onClick={handleUpdateOption}>Valide</Button>
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