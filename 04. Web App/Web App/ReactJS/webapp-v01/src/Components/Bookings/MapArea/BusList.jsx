import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material'
import React, { useState } from 'react'
import BusCard from '../../Card/BusCard';

// Dummy data for busses
const buses = [{
  "id": 1,
  "regNo": 'NA-7555',
  "service": "Normal",
  "routeType": "Normalway",
  "routeNo": 585,
  "org": "SLTB",
  "from": "Zaria",
  "to": "Taboc",
  "arrival": "8:21",
  "departure": "23:51",
  "price": 651.43,
  "available": 0,
  "closing": "2024-07-03"
}, {
  "id": 2,
  "regNo": 'NA-6914',
  "service": "Normal",
  "routeType": "Expressway",
  "routeNo": 320,
  "org": "SLTB",
  "from": "Shahe",
  "to": "Shangdongjie",
  "arrival": "11:46",
  "departure": "17:09",
  "price": 1810.73,
  "available": 44,
  "closing": "2024-01-28"
}, {
  "id": 3,
  "regNo": 'NB-7650',
  "service": "Luxury",
  "routeType": "Normalway",
  "routeNo": 684,
  "org": "Privet",
  "from": "Drnje",
  "to": "Port-Gentil",
  "arrival": "3:14",
  "departure": "19:46",
  "price": 1497.55,
  "available": 15,
  "closing": "2023-10-23"
}, {
  "id": 4,
  "regNo": 'NB-6456',
  "service": "Super Luxury",
  "routeType": "Normalway",
  "routeNo": 413,
  "org": "Privet",
  "from": "Uppsala",
  "to": "Kota Kinabalu",
  "arrival": "14:14",
  "departure": "23:40",
  "price": 1683.46,
  "available": 6,
  "closing": "2024-06-25"
}, {
  "id": 5,
  "regNo": 'NA-5083',
  "service": "Normal",
  "routeType": "Expressway",
  "routeNo": 218,
  "org": "Privet",
  "from": "Kamenné Žehrovice",
  "to": "Jinzhou",
  "arrival": "4:24",
  "departure": "21:49",
  "price": 53.86,
  "available": 43,
  "closing": "2023-09-09"
}];

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

export default function BusList({ activeStep, setActiveStep }) {
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

  // Function to handle booking bus
  const handleClick = (e) => {
    setActiveStep(activeStep + 1);
  };

  return (
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
              <TableCell colSpan={3}>
                <Typography>No Buses Available!</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}