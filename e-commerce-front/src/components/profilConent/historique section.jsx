import PropTypes from "prop-types";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { HistoriqueContext } from "../../Hooks/HistoriqueContext";
import { useState, useContext, useEffect } from "react";



function Historique_section({  onDetailsClick }) {
 const [totalPrices, setTotalPrices] = useState({});
  const { historiques } = useContext(HistoriqueContext);
  const [histoData, setHistoData]= useState([])
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
 

  const fetchTotalPrices = async () => {
    console.log(historiques, "*****")
    const prices = {};
    for (const historique of historiques) {
      try {
        const totalPrice = await getDetail(historique.orders[0].purchase);
        prices[historique.orders[0].purchase] = totalPrice;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    setTotalPrices(prices);
  };
 
  
  useEffect(() => {
    console.log(histoData, "Initial value inside table section****")
    fetchTotalPrices();
    setHistoData(historiques)
  }, []);


  useEffect(() => {
    console.log(historiques,"Historique updated data***************************")
    fetchTotalPrices();
    setHistoData(historiques)
  }, [historiques])

  useEffect(() => {
    console.log(histoData, "VAlue after update")
  }, [histoData])

  async function getDetail(id) {
    try {
      let total = 0;
      const historesponse = await achat_detail(id);
      console.log("liste product1", historesponse);
      if (historesponse.res) {
        console.log("liste product", historesponse.response.data.orders);
        const details = historesponse.response.data.orders;
        details.forEach(
          (detail) => (total += detail.product.price * detail.quantity)
        );
        return total;
      } else {
        console.error(historesponse.err);
        return 0;
      }
    } catch (error) {
      console.error("Error in getDetail:", error);
      return 0;
    }
  }
   
  // console.log("sec_historique", historiques);
  
  return (
    <div>
      <Typography
        variant="h6"
        className="text-sky-500 uppercase items-center flex mb-5"
        noWrap
        component="div"
      >
        <span
          className=" w-50
          mb-8
          text-center
          uppercase
          bg-sky-500
          px-12
          py-2.5
          text-white
          rounded-full
          m-5"
        >
          Historiques
        </span>
        {/* <span>
                            <LockPersonIcon className="text-sky-700 mx-4" />
                        </span> */}
      </Typography>
      <div>
        <TableContainer component={Paper} sx={{ top: "150px" }}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Libellé </TableCell>
                <TableCell align="center">Détails </TableCell>

                <TableCell align="center">Etat</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {histoData.length == 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <div className="mt-10 text-slate-400 text-center text-xl p-4">
                      Aucun achat pour l'instant...
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {histoData.map((historique, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">
                        {formatDate(historique.date)}
                      </TableCell>
                      <TableCell align="center">
                        Vous avez effectué un achat de{" "}
                        {totalPrices[historique.orders[0].purchase]} Ar
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          sx={{ width: 20, height: 20 }}
                          onClick={() =>
                            onDetailsClick(historique.orders[0].purchase)
                          }
                        >
                          Détails
                        </Button>
                      </TableCell>
                      <TableCell
                        align="center"
                        class={
                          historique.is_delivered
                            ? "text-green-600"
                            : "text-orange-600"
                        }
                      >
                        {historique.is_delivered ? "Livré" : "Non livré"}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
Historique_section.propTypes = {
  historiques: PropTypes.array.isRequired,
  onDetailsClick: PropTypes.func.isRequired, // Add prop type for the onDetailsClick function
};
export default Historique_section;
