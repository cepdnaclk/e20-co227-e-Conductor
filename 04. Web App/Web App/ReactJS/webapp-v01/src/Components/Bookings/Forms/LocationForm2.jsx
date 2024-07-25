import { Box, Button, Divider, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import Stepper from '../../ProgressBars/Stepper';
import { StyledTextField } from '../../InputItems/Texts';

const StyledAutoCompletes = ({ 
  id, 
  label, 
  placeholder, 
  inputProps, 
  value, 
  onChange, 
  findMyLocation, 
}) => (

  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: '8px' }}>
    <Grid container>
      <Typography sx={{ color: 'black' }}>{label}</Typography>
      <TextField
        id={id}
        fullWidth
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        InputProps={{
          startAdornment: placeholder && (
            <IconButton type="button" sx={{ p: '10px', color: 'black' }} aria-label="search" >
              <SearchIcon />
            </IconButton>
          ),
          endAdornment: placeholder && (
            <>
              <Divider sx={{ height: 28, m: 0.5, bgcolor: 'black' }} orientation="vertical" />
              <IconButton sx={{ p: '10px', color: 'black' }} aria-label="directions" onClick={findMyLocation}>
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

export default function LocationForm({ steps, activeStep, setFrom, dateError, setTo, handleClick, handleFromLocation, handleToLocation, findMyLocation, date, setDate }) {
  // Variable to store text filed states
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');

  // Handling search button
  const handleSearch = (key) => {
    console.log(`Search ${key}`);
    if(key === 'to'){
      setTo(toValue);
    } else if (key === 'from') {
      setFrom(fromValue);
    }
  }

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
        <Box sx={{display:'flex', flexDirection:'column', gap:'15px'}}>
          <StyledAutoCompletes 
            id='from'
            placeholder="Enter location" 
            label="From: " 
            inputProps={{maxLength:30}} 
            value={fromValue} 
            onChange={(e)=>setFromValue(e.target.value)}
            findMyLocation={findMyLocation}
            search={()=>handleSearch('from')}
          />

          <StyledAutoCompletes 
            id='to'
            placeholder="Enter location" 
            label="To: " 
            inputProps={{maxLength:30}} 
            onChange={(e)=>setToValue(e.target.value)}
            value={toValue}
            findMyLocation={findMyLocation}
            search={()=>handleSearch('to')}
          />

          <StyledTextField 
            id='date'
            label="Date: " 
            type="date" 
            inputProps={{ min: "1900-01-01", max: "2200-12-31", }} 
            value={date}
            onChange={(e)=>{setDate(e.target.value)}}
            error={dateError}
            helperText={dateError && '* Invalid Date'}
          />
        </Box>

        <Box>
          <Button variant='contained' fullWidth onClick={handleClick}>Continue</Button>
        </Box>
      </Box>
    </Paper>
  )
}
