import { Grid, Paper } from '@mui/material'
import React from 'react'
import Purchasing from './Forms/Purchasing';
import Bill from './MapArea/Bill';

export default function Payment({activeStep, setActiveStep, bookingData, setBookingData, steps, setLoading}) {
  // Handling back button
  const handleBack = () => {
    console.log('Goto step: 3');
    setActiveStep(activeStep - 1);
  }
  
  return (
    <Paper sx={{bgcolor:'ghostwhite', width: "100%", height:"fit-content",  display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'10px'}}>
      <Grid container sx={{width:'100%', display: 'flex', justifyContent:"space-between"}}>
        <Grid item xs={12} md={4} display='flex' justifyContent='center' alignItems='center'>
          <Purchasing 
            steps={steps} 
            activeStep={activeStep} 
            bookingData={bookingData}
            setBookingData={setBookingData}
            handleBack={handleBack}
            setLoading={setLoading}
          />
        </Grid>
        
        <Grid item xs={12} md={8} display='flex' justifyContent='center' alignItems='center'>
          <Bill bookingData={bookingData}/>
        </Grid>
      </Grid> 
    </Paper>
  )
}
