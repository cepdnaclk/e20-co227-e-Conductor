import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { StyledTextField } from '../../InputItems/Texts';

export default function Passengers({activeStep, setActiveStep}) {
  const [adults, setAdults] = useState('');
  const [children, setChildren] = useState('');

  const handleNumberChange = (setter) => (event) => {
    let value = parseInt(event.target.value, 10);
    if (isNaN(value)) value = '';
    else if (value < 0) value = 0;
    else if (value > 54) value = 54;
    setter(value);
  };

  return (
    <Box sx={{display:'flex', flexDirection:'column', justifyContent:'space-between', height:'100%'}}>
      <Box height='190px' display='flex' flexDirection='column' justifyContent='space-between'>
        <Box>
          <Typography sx={{ color: 'black', fontFamily: 'Open sans', fontWeight: 'bold' }}>Passengers:</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'baseline' }}>
              <StyledTextField
                placeholder='Adults'
                type='number'
                value={adults}
                onChange={handleNumberChange(setAdults)}
                //inputProps={{ min: 0, max: 54, }}
              />
            </Grid>

            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'baseline' }}>
              <StyledTextField
                placeholder='Children'
                type='number'
                value={children}
                //inputProps={{ min: 0, max: 54, }}
                onChange={handleNumberChange(setChildren)}
              />
            </Grid>
          </Grid>
        </Box>

        <Box>
          <StyledTextField placeholder='Select your preference(s)' readOnly label='Seat Preferences:' />
        </Box>
      </Box>
      <Box sx={{display:'flex', justifyContent:'space-between'}}>
        <Button variant='outlined' sx={{width: '120px'}} onClick={()=>{setActiveStep(activeStep-1)}}>Back</Button>
        <Button variant='contained' sx={{width: '120px'}} onClick={()=>{setActiveStep(activeStep+1)}}>Continue</Button>
      </Box>
    </Box>
  );
}
