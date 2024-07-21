import { Box, Button, Divider, Grid, IconButton, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import MyLocationIcon from '@mui/icons-material/MyLocation';

const StyledTextField = ({ label, placeholder, type = "text", readOnly=false, inputProps }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: '8px' }}>
    <Grid container>
      <Typography sx={{ color: 'black' }}>{label}</Typography>
      <TextField
        fullWidth
        placeholder={placeholder}
        type={type}
        InputProps={{
          readOnly: readOnly,
          startAdornment: placeholder && (
            <IconButton type="button" sx={{ p: '10px', color: 'black' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          ),
          endAdornment: placeholder && (
            <>
              <Divider sx={{ height: 28, m: 0.5, bgcolor: 'black' }} orientation="vertical" />
              <IconButton sx={{ p: '10px', color: 'black' }} aria-label="directions">
                <MyLocationIcon />
              </IconButton>
            </>
          ),
          style: { color: 'black' }
        }}
        InputLabelProps={{ shrink: true }}
        inputProps={inputProps}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'black' },
            '&:hover fieldset': { borderColor: 'black' },
            '&.Mui-focused fieldset': { borderColor: 'black' },
            color: 'black'
          },
        }}
      />
    </Grid>
  </Box>
);

export default function LocationForm({activeStep, setActiveStep, bookingData, setBookingData}) {
  // Variables to store from location
  const location = { palce: '', lng: '', lat:'', fairStage:'' };
  const [from , setFrom] = useState(bookingData.from || location);
  const [to , setTo] = useState(bookingData.to || location);

  // Variable to store booked date
  const [date , setDate] = useState('');

  // Handling continue button
  const handleClick = () =>{
    // Update booking data
    setBookingData({...bookingData, from:from, to:to, date:date});

    // Goto next step
    setActiveStep(activeStep + 1);
  }

  return (
    <Box sx={{display:'flex', flexDirection:'column', justifyContent:'space-between', height:'100%'}}>
      <Box sx={{display:'flex', flexDirection:'column', gap:'15px'}}>
        <StyledTextField placeholder="Enter location" label="From: " inputProps={{maxLength:10}}/>
        <StyledTextField placeholder="Enter location" label="To: " inputProps={{maxLength:10}}/>
        <StyledTextField label="Date:" type="date" inputProps={{ min: "1900-01-01", max: "2200-12-31", }}/>
      </Box>
      <Box>
        <Button variant='contained' fullWidth onClick={handleClick}>Continue</Button>
      </Box>
    </Box>
  )
}
