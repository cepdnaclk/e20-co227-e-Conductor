import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid} from '@mui/material'
import React from 'react'



export default function BusFilter({activeStep, setActiveStep}) {
  const handleClick = () =>{
    // Update booking data
    //setBookingData({...bookingData, from:})

    // Goto next step
    setActiveStep(activeStep - 1);
  }

  return (
    <Box sx={{display:'flex', flexDirection:'column', justifyContent:'space-between', height:'100%'}}>
      <Box  sx={{display:'flex', flexDirection:'column', gap:'20px'}}>
        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{whiteSpace:'nowrap', fontFamily:'Open Sans', fontWeight:'bold'}} >Service Type</FormLabel>
          <FormGroup aria-label="position" row sx={{display:'flex' , justifyContent:'space-between', width:'100%'}}>
            <FormControlLabel
              value="super"
              control={<Checkbox />}
              label="Super Luxury"
              labelPlacement="end"
            />
            <FormControlLabel
              value="luxury"
              control={<Checkbox />}
              label="Luxury"
              labelPlacement="end"
            />
            <FormControlLabel
              value="semi"
              control={<Checkbox />}
              label="Semi Luxury"
              labelPlacement="end"
            />
            <FormControlLabel
              value="normal"
              control={<Checkbox />}
              label="Normal"
              labelPlacement="end"
            />
          </FormGroup>
        </FormControl>

        <FormControl component="fieldset" fullWidth >
          <FormLabel component="legend" sx={{whiteSpace:'nowrap', fontFamily:'Open Sans', fontWeight:'bold'}}>Route Type</FormLabel>
          <FormGroup aria-label="position" row sx={{display:'flex' , width:'100%', }}>
          <Grid container>
            <Grid item xs={6}>
              <FormControlLabel
                value="express"
                control={<Checkbox />}
                label="Expressway"
                labelPlacement="end"
              />
              </Grid>
              <Grid item xs={6}>
              <FormControlLabel
                value="normal"
                control={<Checkbox />}
                label="Normalway"
                labelPlacement="end"
              />
              </Grid>
            </Grid>
          </FormGroup>
        </FormControl>

        <FormControl component="fieldset" fullWidth >
          <FormLabel component="legend" sx={{whiteSpace:'nowrap', fontFamily:'Open Sans', fontWeight:'bold'}}>Organization Catagory</FormLabel>
          <FormGroup aria-label="position" row sx={{display:'flex' , width:'100%'}}>
            <Grid container>
              <Grid item xs={6}>
                <FormControlLabel
                  value="sltb"
                  control={<Checkbox />}
                  label="SLTB"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  value="privert"
                  control={<Checkbox />}
                  label="Privert"
                  labelPlacement="end"
                />
              </Grid>
            </Grid>
          </FormGroup>
        </FormControl>
      </Box>

      <Box>
        <Button variant='outlined' fullWidth onClick={handleClick}>Back</Button>
      </Box>
    </Box>
  );
}
