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

function Achat_detail({orders}) {
  
    const [open, setOpen] = React.useState(false);
       const formatTimeDifference = (date) => {
        const formattedDate = new Date(date);
        return formatDistanceToNow(formattedDate, { locale: fr, addSuffix: true });
      };
      console.log("detail", orders)
  
  return (
    <div>

            <div className="w-full mb-8 text-center uppercase bg-sky-500 p-4 text-white rounded-full mb-5">
                Vos achat 
            </div>    
         
            <div className='w-[100%]'>
                    <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                        <TableRow>
                        
                            <TableCell>Nom d'article</TableCell>
                            <TableCell align="left">Prix unitaire</TableCell>
                            <TableCell align="left">Quatité</TableCell>

                            <TableCell align="left">Prix total</TableCell>
                        
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            
                        {Array && orders.map((order, index)=>(
                            <TableRow key={index} >
                            <TableCell>Yaourt{order.product} </TableCell>
                            <TableCell align="left">2500</TableCell>
                            <TableCell align="left">{order.quantity}</TableCell>
                            <TableCell align="left">4500</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
            </div>
    </div>
  )
}

export default Achat_detail