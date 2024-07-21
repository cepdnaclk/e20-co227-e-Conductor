import React from 'react';
import './BookingForm.css';
import { Box, Paper } from '@mui/material';
import Stepper from '../../ProgressBars/Stepper';
import LocationForm from './LocationForm';
import BusFilter from './BusFilter';
import Purchasing from './Purchasing';
import Passengers from './Passengers';

// Steps to the stepper
const steps = [
  'Add Locations',
  'Select Bus',
  'Select Seats',
  'Payment',
];

export default function BookingForm({activeStep, setActiveStep, bookingData, setBookingData, seats}) {
  return (
    <Paper sx={{
      width:'Calc(100% - 20px)', 
      height:'70vh', 
      minHeight:'400px', 
      padding:'20px', 
      display:'flex',
      flexDirection:'column',
      justifyContent: 'space-between',
      margin:'10px 0'
    }}>
      <Stepper steps={steps} activeStep={activeStep} height={'100px'}/>

      <Box sx={{width:'100%', height:'calc(100% - 100px)'}}>
        {(()=>{
          switch (activeStep) {
            case 0:
              return <LocationForm activeStep={activeStep} setActiveStep={setActiveStep} bookingData={bookingData} setBookingData={setBookingData}/>
          
            case 1:
              return <BusFilter activeStep={activeStep} setActiveStep={setActiveStep}  />

            case 2:
              return <Passengers activeStep={activeStep} setActiveStep={setActiveStep} />

            case 3:
              return <Purchasing activeStep={activeStep} setActiveStep={setActiveStep} bookingData={bookingData}/>

            default:
              break;
          }
        })()}
      </Box>
    </Paper>
  )
}
