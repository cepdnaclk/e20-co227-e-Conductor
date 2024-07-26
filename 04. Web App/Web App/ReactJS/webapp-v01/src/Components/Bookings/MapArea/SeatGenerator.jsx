import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { TbSteeringWheel } from 'react-icons/tb';
import CircleIcon from '@mui/icons-material/Circle';

const SeatGenerator = ({
  rows,
  columns,
  emptyRows,
  emptySeatColumn,
  bookedSeats,
  reservedSeats,
  selectedSeats,
  onSeatClick,
}) => {
  const createSeats = (
    rows,
    columns,
    emptyRows,
    emptySeatColumn,
    bookedSeats,
    reservedSeats,
    selectedSeats
  ) => {
    let seats = [];
  
    // Initialize seats with default numbers
    for (let row = 0; row < rows; row++) {
      let rowSeats = [];
      for (let col = 0; col < columns; col++) {
        rowSeats.push({
          status: 'available', // available, booked, reserved, selected, emptySeat, space
          number: null, // Initial placeholder
        });
      }
      seats.push(rowSeats);
    }
  
    // Add space rows at specified indices
    emptyRows.forEach(rowIndex => {
      if (rowIndex < seats.length) {
        seats.splice(rowIndex, 0, Array(columns).fill({ status: 'space' }));
      }
    });
  
    // Add empty seats in the specified column
    if (emptySeatColumn >= 0 && emptySeatColumn < columns) {
      for (let rowIndex = emptyRows.length > 0 ? Math.max(...emptyRows) + 1 : 0; rowIndex < seats.length; rowIndex++) {
        if (seats[rowIndex] && seats[rowIndex][emptySeatColumn]) {
          seats[rowIndex][emptySeatColumn] = { status: 'emptySeat', number: null };
        }
      }
    }
  
    // Add an extra seat to the most right column
    const lastColumn = columns - 1; // Most right column
    if (lastColumn >= 0) {
      for (let rowIndex = 0; rowIndex < seats.length; rowIndex++) {
        if (seats[rowIndex] && seats[rowIndex][lastColumn]) {
          seats[rowIndex][lastColumn] = { status: 'available', number: null };
        }
      }
    }
  
    // Renumber seats continuously in the specified format
    let currentNumber = 1;
    for (let colIndex = 0; colIndex < columns; colIndex++) {
      for (let rowIndex = (rows + emptyRows.length - 1); rowIndex >= 0; rowIndex--) {
        if (
          seats[rowIndex] &&
          seats[rowIndex][colIndex] &&
          seats[rowIndex][colIndex].status !== 'space' &&
          seats[rowIndex][colIndex].status !== 'emptySeat'
        ) {
          seats[rowIndex][colIndex] = { ...seats[rowIndex][colIndex], number: currentNumber++ };
        }
      }
    }
  
    // Mark booked seats
    bookedSeats.forEach((bookedNumber) => {
      for (let rowIndex = 0; rowIndex < seats.length; rowIndex++) {
        for (let colIndex = 0; colIndex < seats[rowIndex].length; colIndex++) {
          if (seats[rowIndex][colIndex] && seats[rowIndex][colIndex].number === bookedNumber) {
            seats[rowIndex][colIndex].status = 'booked';
          }
        }
      }
    });
  
    // Mark reserved seats
    reservedSeats.forEach((reservedNumber) => {
      for (let rowIndex = 0; rowIndex < seats.length; rowIndex++) {
        for (let colIndex = 0; colIndex < seats[rowIndex].length; colIndex++) {
          if (seats[rowIndex][colIndex] && seats[rowIndex][colIndex].number === reservedNumber) {
            seats[rowIndex][colIndex].status = 'reserved';
          }
        }
      }
    });
  
    // Mark selected seats
    selectedSeats.forEach((selectedNumber) => {
      for (let rowIndex = 0; rowIndex < seats.length; rowIndex++) {
        for (let colIndex = 0; colIndex < seats[rowIndex].length; colIndex++) {
          if (seats[rowIndex][colIndex] && seats[rowIndex][colIndex].number === selectedNumber) {
            seats[rowIndex][colIndex].status = 'selected';
          }
        }
      }
    });
  
    return seats;
  };
  
  const [seats, setSeats] = useState(
    createSeats(rows, columns, emptyRows, emptySeatColumn, bookedSeats, reservedSeats, selectedSeats)
  );

  useEffect(() => {
    setSeats(createSeats(rows, columns, emptyRows, emptySeatColumn, bookedSeats, reservedSeats, selectedSeats));
  }, [selectedSeats, bookedSeats, reservedSeats, emptyRows, emptySeatColumn, rows, columns]);

  const handleSeatClick = (rowIndex, colIndex) => {
    const seat = seats[rowIndex][colIndex];
    if (
      seat &&
      seat.status !== 'space' &&
      seat.status !== 'emptySeat' &&
      seat.status !== 'booked' &&
      seat.status !== 'reserved'
    ) {
      onSeatClick(seat.number);
    }
  };

  const getSeatColor = (status) => {
    switch (status) {
      case 'available':
        return '#666666';
      case 'booked':
        return '#cc0000';
      case 'reserved':
        return '#e68a00';
      case 'selected':
        return 'blue';
      case 'emptySeat':
        return 'transparent'; // Color for empty seat
      case 'space':
        return 'transparent'; // Space row color
      default:
        return '#666666';
    }
  };

  return (
      <Box 
        gap={1} 
        display={'flex'} 
        flexDirection={'column'} 
        justifyContent={'center'} 
        alignItems={'center'} 
        width='max-content'
        height='max-content'
      >
        <Typography variant="h5" fontFamily='Open sans' fontWeight='bold' gutterBottom>
            Seat Availability
        </Typography>
        
        <Box sx={{
            bgcolor:'#b3ffcc', 
            width:'max-content', 
            height:'max-content',
            padding:'30px', 
            border:'2px solid black', 
            borderRadius:'10px'
        }}>
            <Grid container spacing={1} direction="column" alignItems="center">
            {seats.map((row, rowIndex) => (
                <Grid item key={rowIndex} xs={12}>
                    <Grid container spacing={1}>
                        <Grid item key="driver-seat">
                            <Box
                                sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '40px',
                                height: '40px',
                                borderRadius: '8px',
                                backgroundColor: rowIndex === 0 ? 'black' : 'transparent',
                                position: 'relative',
                                }}
                            >
                                {rowIndex === 0 && <TbSteeringWheel size={24} color="white" />}
                            </Box>
                        </Grid>

                        {row.map((seat, colIndex) => (
                        <Grid item key={colIndex}>
                            <Box
                            onClick={() => handleSeatClick(rowIndex, colIndex)}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: seat &&
                                seat.status !== 'space' &&
                                seat.status !== 'emptySeat' &&
                                seat.status !== 'booked' &&
                                seat.status !== 'reserved'
                                ? 'pointer'
                                : 'default',
                                width: '40px', // Size of the seat
                                height: '40px', // Size of the seat
                                borderRadius: '8px', // Curved corners
                                backgroundColor: seat ? getSeatColor(seat.status) : 'transparent',
                                position: 'relative',
                                '&:hover': {
                                opacity: seat &&
                                    seat.status !== 'space' &&
                                    seat.status !== 'emptySeat' &&
                                    seat.status !== 'booked' &&
                                    seat.status !== 'reserved'
                                    ? 0.8
                                    : 1,
                                },
                            }}
                            >
                            {seat && seat.status !== 'space' && seat.status !== 'emptySeat' && (
                                <Typography
                                variant="caption"
                                sx={{ position: 'absolute', color: 'white', fontWeight: 'bold' }}
                                >
                                {seat.number}
                                </Typography>
                            )}
                            </Box>
                        </Grid>
                        ))}
                    </Grid>
                </Grid>
            ))}
            </Grid>
        </Box>

        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={4} mt={2} mb={2}>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={0.5}>
                <CircleIcon sx={{color:'black', fontSize:'20px'}}/>
                <Typography fontSize={16}>Driver Seat</Typography>
            </Box>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={0.5}>
                <CircleIcon sx={{color:'#666666', fontSize:'20px'}}/>
                <Typography fontSize={16}>Available Seats</Typography>
            </Box>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={0.5}>
                <CircleIcon sx={{color:'#cc0000', fontSize:'20px'}}/>
                <Typography fontSize={16}>Booked seats</Typography>
            </Box>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={0.5}>
                <CircleIcon sx={{color:'#e68a00', fontSize:'20px'}}/>
                <Typography fontSize={16}>Reserved Seats</Typography>
            </Box>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={0.5}>
                <CircleIcon sx={{color:'blue', fontSize:'20px'}}/>
                <Typography fontSize={16}>Selected Seats</Typography>
            </Box>
        </Box>
      </Box>
  );
};

export default SeatGenerator;
