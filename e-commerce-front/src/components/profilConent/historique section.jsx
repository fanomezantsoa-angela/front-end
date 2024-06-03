import PropTypes from "prop-types";
// import Box from "@mui/material/Box";
// import Collapse from "@mui/material/Collapse";
// import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import {  achat_detail } from "../../Hooks/AchatApi";
// import { getToggleButtonGroupUtilityClass } from "@mui/material";
function Historique_section({ historiques, onDetailsClick }) {
 const [totalPrices, setTotalPrices] = useState({});
 const [histoData, setHistoData] = useState([])

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
        className="text-sky-700 uppercase items-center flex mb-5"
        noWrap
        component="div"
      >
        <span>Historique</span>
        {/* <span>
                            <LockPersonIcon className="text-sky-700 mx-4" />
                        </span> */}
      </Typography>
      <div>
        <TableContainer component={Paper} sx={{ top: "100px" }}>
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
