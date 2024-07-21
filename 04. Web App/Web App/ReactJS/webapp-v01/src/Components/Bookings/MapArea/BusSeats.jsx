import React from 'react'
import SeatGenerator from './SeatGenerator'
import { Box, Typography } from '@mui/material'

export default function BusSeats({handleClick, totalSeats, bookedSeats, selectedSeats }) {
  return (
    <Box sx={{ width:'100%', height:'100%', overflow:'auto',  p:'20px'}}>
      <Box display={'flex'} justifyContent={'center'} width={'100%'} height={'100%'} minWidth='fit-content' minHeight='fit-content'>
        {(()=>{
          switch (totalSeats) {
            case 54:{
              return <SeatGenerator
                rows={5}
                columns={11}
                emptyRows={[3]}
                emptySeatColumn={9}
                reservedSeats={[1,2,3,4,5,6,7]}
                bookedSeats={bookedSeats}
                onSeatClick={handleClick}
                selectedSeats={selectedSeats}
            />
            }

            case 42:{
              return <SeatGenerator
                rows={4}
                columns={11}
                emptyRows={[2,3]}
                emptySeatColumn={9}
                reservedSeats={[1,2,3,4,5,6,7,8]}
                bookedSeats={bookedSeats}
                onSeatClick={handleClick}
                selectedSeats={selectedSeats}
            />
            }

            // Need to modify
            case 33:{
              return <SeatGenerator
                rows={3}
                columns={10}
                emptyRows={[2]}
                emptySeatColumn={1}
                reservedSeats={[1,2,3,4,5]}
                bookedSeats={bookedSeats}
                onSeatClick={handleClick}
                selectedSeats={selectedSeats}
            />
            }
          
            default:{
              return <Typography>Invalid</Typography>
            }
          }
        })()}
      </Box>
    </Box>
  )
}
