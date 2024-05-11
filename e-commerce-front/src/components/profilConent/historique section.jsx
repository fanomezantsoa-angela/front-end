import React from 'react'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';
import { useState } from 'react';
function Historique_section({historiques,  onDetailsClick}) {
  const [detail, setDetail]= useState([])
  function formatDate(dateString) {
    if(dateString){
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    // Pad single digit day/month with leading zero
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
  
    return `${formattedDay}/${formattedMonth}/${year}`;
    }
    else{
      return "/ / "
    }
  }
  console.log("sec_historique", historiques)
  console.log()

  
  return (
    <div>
        <Typography 
                    variant="h6" 
                    className='text-sky-700 uppercase items-center flex mb-5' 
                    noWrap 
                    component="div">
                        <span>
                        Historique                       
                        </span>
                        {/* <span>
                            <LockPersonIcon className="text-sky-700 mx-4" />
                        </span> */}
                    </Typography>
          <div>
            <TableContainer component={Paper} sx={{top:"100px"}}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
          
            <TableCell align="center">Date
           
            
            </TableCell>
            <TableCell align="center">Libellé </TableCell>
            <TableCell align="center">Détails </TableCell>

            <TableCell align="center">Etat</TableCell>

           
          </TableRow>
        </TableHead>
        <TableBody>
              {historiques.map((historique, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                    {formatDate(historique.date)}
                  </TableCell>
                  <TableCell align="center">
                    Vous avez effectué un achat de 45000 Ar
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                     
                      sx={{ width: 20, height: 20 }}
                      onClick={() =>  onDetailsClick(historique.orders)}
                    >
                      Détails
                    </Button>
                  </TableCell>
                  <TableCell align="center" class={historique.is_delivered ? "text-green-600": "text-orange-600" }>
                    {historique.is_delivered ? "Livré" : "Non livré"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
      </Table>
    </TableContainer>
            </div>
    </div>
  )
}
Historique_section.propTypes = {
	historiques: PropTypes.array.isRequired,
	onDetailsClick: PropTypes.func.isRequired, // Add prop type for the onDetailsClick function
  };
export default Historique_section