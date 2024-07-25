import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import Texts, { StyledTextField } from '../../InputItems/Texts';
import Stepper from '../../ProgressBars/Stepper';

export default function Passengers({
  activeStep, 
  steps, 
  available, 
  adults, setAdults,
  children, setChildren, 
  handleBack, 
  handleNext, 
  selectedSeats, 
  reset,
  error
}) { 

  // Limit the input fields
  const handleNumberChange = (setter) => (event) => {
    let value = parseInt(event.target.value, 10);
    if (isNaN(value)) value = 0;
    else if (value < 0) value = 0;
    else if (value > available) value = available;
    setter(value);
  };

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

      <Box sx={{width:'100%', height:'calc(100% - 100px)', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
        <Box height='190px' display='flex' flexDirection='column' justifyContent='space-between'>
          <Box>
            <Typography sx={{ color: 'black', fontFamily: 'Open sans', fontWeight: 'bold' }}>Passengers:</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} sx={{ display: 'flex', alignItems: 'baseline' }}>
                <StyledTextField
                  placeholder='Adults'
                  type='number'
                  value={adults === 0 ? '' : adults}
                  error={error}
                  onChange={handleNumberChange(setAdults)}
                />
              </Grid>

              <Grid item xs={6} sx={{ display: 'flex', alignItems: 'baseline' }}>
                <StyledTextField
                  placeholder='Children'
                  type='number'
                  value={children === 0 ? '' : children}
                  error={error}
                  onChange={handleNumberChange(setChildren)}
                />
              </Grid>
            </Grid>
            <Texts fontColor='red'>{error ? '* Invalid passenger count.' : ''}</Texts>
          </Box>

          <Box>
            <StyledTextField 
              placeholder='Select your preference(s)' 
              readOnly label='Seat Preferences:' 
              value={selectedSeats}
            />
          </Box>
          
        </Box>
        <Button variant='outlined' fullWidth onClick={reset}>RESET</Button>

        <Box sx={{display:'flex', justifyContent:'space-between'}}>
          <Button variant='outlined' sx={{width: '120px'}} onClick={handleBack}>Back</Button>
          <Button variant='contained' sx={{width: '120px'}} onClick={handleNext}>Continue</Button>
        </Box>
      </Box>
    </Paper>
  );
}
