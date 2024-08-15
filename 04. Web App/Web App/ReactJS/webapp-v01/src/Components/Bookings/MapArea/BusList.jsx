import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material'
import React, { useState } from 'react'
import BusCard from '../../Card/BusCard';

const BookingTableHeader = ({ order, orderBy, onRequestSort }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell align='center'>
          <TableSortLabel
            active={orderBy === 'departure'}
            direction={orderBy === 'departure' ? order : 'asc'}
            onClick={createSortHandler('departure')}
          >
            Departure Time
          </TableSortLabel>
        </TableCell>

        <TableCell align='center'>
          <TableSortLabel
            active={orderBy === 'arrival'}
            direction={orderBy === 'arrival' ? order : 'asc'}
            onClick={createSortHandler('arrival')}
          >
            Arrival Time
          </TableSortLabel>
          
        </TableCell>

        <TableCell align='center'>
          <TableSortLabel
            active={orderBy === 'price'}
            direction={orderBy === 'price' ? order : 'asc'}
            onClick={createSortHandler('price')}
          >
            Price
          </TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default function BusList({ activeStep, setActiveStep, buses, handleClick }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('departure');

  // Function to handle sorting
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'; // Current State
    setOrder(isAsc ? 'desc' : 'asc');                      // Next State
    setOrderBy(property);
  };

  // Sorting Algorithm 
  const sortedBuses = buses.sort((a, b) => {
    let x;
    let y;

    // function to convert time to minutes
    const getMinutes = (obj) => {
      const timeArr = obj.split(':');
      return parseInt(timeArr[0]) * 60 + parseInt(timeArr[1]);
    }

    // OrderBy price
    if(orderBy === 'price') {
      x = parseFloat(a.price);
      y = parseFloat(b.price);
    } else if(orderBy === 'departure'){
      x = getMinutes(a.departure);
      y = getMinutes(b.departure);
    } else {
      x = getMinutes(a.arrival);
      y = getMinutes(b.arrival);
    }

    //console.log(`x: ${x}   y: ${y}`);
    return (order === 'asc') ? (x - y) : (y - x);
  });

  return (
    <Paper sx={{width:'calc(100% - 20px)', height:'70vh', minHeight:'400px', gap:'20px', margin:'10px 0'}}>
      <TableContainer component={Paper} sx={{overflow: 'auto', maxHeight:'100%', width:'100%', backgroundColor:'ghostwhite'}}>
        <Table stickyHeader aria-label="sticky table" >
          <BookingTableHeader order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />

          <TableBody >
            {sortedBuses.length > 0 ? (
              sortedBuses.map((bus) => (
                <TableRow key={bus.id}>
                  <TableCell colSpan={3}>
                    <BusCard bus={bus} onClick={handleClick} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align='center' colSpan={3}>
                  <Typography>No Buses Available!</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}