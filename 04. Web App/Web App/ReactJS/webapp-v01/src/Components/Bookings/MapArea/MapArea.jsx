import React from 'react'
import { Paper } from '@mui/material'
import Map from './Map'
import BusSeats from './BusSeats'
import BusList from '../MapArea/BusList'
import Bill from './Bill'



export default function MapArea({activeStep, setActiveStep}) {
  // Function to handle seats
  const handleSeats = (e) =>{
    console.log(e+'is clicked');
  }

  return (
    <Paper sx={{width:'calc(100% - 20px)', height:'70vh', minHeight:'400px', gap:'20px', margin:'10px 0'}}>
      {(()=>{
        switch (activeStep) {
          case 0:{
            return <Map />
          }

          case 1:{
            return <BusList activeStep={activeStep} setActiveStep={setActiveStep} />
          }

          case 2:{
            return <BusSeats 
              handleClick={handleSeats}
              totalSeats={33}
              bookedSeats={[10, 14, 12, 15]}
              selectedSeats={[18,21,35,50]}
            />
          }

          case 3:{
            return <Bill />
          }
            
          default:
            break;
        }
      })()}
    </Paper>
  )
}
