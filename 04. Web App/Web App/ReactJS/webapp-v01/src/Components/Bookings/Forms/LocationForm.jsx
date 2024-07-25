import { Autocomplete, Box, Button, Divider, Grid, IconButton, Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import Stepper from '../../ProgressBars/Stepper';
import Texts, { StyledTextField } from '../../InputItems/Texts';
import { GetResponse } from '../../../APIs/NodeBackend';

// Dummy bus stop names
const data = [
  {
    "id": "1",
    "name": "Kurunduwatte",
    "latitude": 7.243630047731192,
    "longitude": 80.59471319873906
  },
  {
    "id": "2",
    "name": "Akbar",
    "latitude": 7.25235057321553,
    "longitude": 80.59333382765641
  },
  {
    "id": "3",
    "name": "Peradeniya",
    "latitude": 7.2631666355550575,
    "longitude": 80.59296904470439
  },
  {
    "id": "4",
    "name": "Galaha Junction",
    "latitude": 7.2656183598161075,
    "longitude": 80.59577370836975
  },
  {
    "id": "5",
    "name": "Botanical Garden",
    "latitude": 7.2675836946042915,
    "longitude": 80.59648176923187
  },
  {
    "id": "6",
    "name": "Hospital",
    "latitude": 7.268000173687011,
    "longitude": 80.59916263694033
  },
  {
    "id": "7",
    "name": "Rajawaththa",
    "latitude": 7.268047028533296,
    "longitude": 80.60223751719053
  },
  {
    "id": "8",
    "name": "Dangolla Junction",
    "latitude": 7.270664240431243,
    "longitude": 80.60479764429803
  },
  {
    "id": "9",
    "name": "Gatambe",
    "latitude": 7.272281404312179,
    "longitude": 80.60606340111026
  },
  {
    "id": "10",
    "name": "Kandy Hospital",
    "latitude": 7.288209595790418,
    "longitude": 80.63166044283383
  }
];

const StyledAutoComplete = ({ 
  id, 
  label, 
  placeholder, 
  onChange, 
  findMyLocation, 
  options,
  value
}) => (
  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: '8px' }}>
    <Grid container direction='column'>
      <Texts>{label}</Texts>
      <Autocomplete 
        freeSolo
        id={id}
        //disableClearable
        options={options.map((option)=>option.name)}
        onChange={onChange}
        value={value}
        renderInput={(params) => (
          <TextField 
            {...params}
            placeholder={placeholder}
            InputProps={{
              ...params.InputProps,
              type: 'search',
              startAdornment: <SearchIcon sx={{m:'0 10px 0 5px'}}/> ,
              endAdornment: (<>
                <Divider sx={{ height: 28, m: 0.5, bgcolor: 'black' }} orientation="vertical" />
                <IconButton sx={{ p: '10px', color: 'black' }} aria-label="directions" onClick={findMyLocation}>
                  <MyLocationIcon />
                </IconButton>
              </>),
              style: { color: 'black' }
            }}
            InputLabelProps={{ shrink: true }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'black' },
                '&:hover fieldset': { borderColor: 'black' },
                '&.Mui-focused fieldset': { borderColor: 'black' },
                color: 'black'
              },
            }}
          />
        )}
      />
    </Grid>
  </Box>
);

export default function LocationForm({ 
  steps, activeStep, 
  from,  setFrom, 
  to,    setTo,
  date,  setDate,   dateError,
  setLoading,
  handleClick, 
  findMyLocation, 
}) {
  // Variable to store text field states
  const [names, setNames] = useState(JSON.parse(sessionStorage.getItem('busStopNames')) || []);

  // Fetching bus stop names from backend
  useEffect(()=>{
    const fetch = async() => {
      try {
        setLoading(true);  // Enabling spinner
        const serverResponse = await GetResponse('busstops/names');
        console.log(`busStopNames:: ${JSON.stringify(serverResponse.data)}`);
        setNames(serverResponse.data);
      } catch (error) {
        console.log('error in fetching busstop names');
      } finally {
        setLoading(false);  // Disabling spinner
      }
    }

    //fetch();
    setNames(data);
  }, []);

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
          <StyledAutoComplete
            id='from'
            placeholder="Enter location" 
            label="From: " 
            onChange={(e, value)=>setFrom((names.filter(name => name.name === value))[0] || {})}
            findMyLocation={findMyLocation}
            options={names}
            value={from?.name || ''}
          />

          <StyledAutoComplete
            id='to'
            placeholder="Enter location" 
            label="To: " 
            onChange={(e, value)=>setTo((names.filter(name => name.name === value))[0] || {})}
            findMyLocation={findMyLocation}
            options={names}
            value={to?.name || ''}
          />

          <StyledTextField 
            id='date'
            label="Date: " 
            type="date" 
            inputProps={{ min:'2020-01-01', max: "2200-12-31", }} 
            value={date}
            onChange={(e)=>{setDate(e.target.value)}}
            error={dateError}
            helperText={dateError && 'Reservation must be more than 24 hours.'}
          />
        </Box>

        <Box>
          <Button variant='contained' fullWidth onClick={handleClick}>Continue</Button>
        </Box>
      </Box>
    </Paper>
  )
}
