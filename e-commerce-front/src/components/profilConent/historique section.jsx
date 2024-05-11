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
function Historique_section() {
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
            <TableCell align="center"> </TableCell>

            <TableCell align="center">Etat</TableCell>

           
          </TableRow>
        </TableHead>
        <TableBody>
        <TableCell align="center">12/02/2024</TableCell>
        <TableCell align="center">Vous avez effectué un achat de 45000 Ar <br/>
      
        </TableCell>
       <TableCell>  <Button variant="outlined" href="#outlined-buttons"
        sx={{ width: 20, height: 20,
        }}
        >
        Détails
      </Button></TableCell>
        <TableCell align="center">Livré</TableCell>

        </TableBody>
      </Table>
    </TableContainer>
            </div>
    </div>
  )
}

export default Historique_section