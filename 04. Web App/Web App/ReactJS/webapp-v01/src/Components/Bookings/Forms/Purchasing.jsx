import { Box, Button, Divider, Grid } from '@mui/material'
import React from 'react'
import Texts from '../../InputItems/Texts'
import { useNavigate } from 'react-router-dom';



export default function Purchasing({bookingData, activeStep, setActiveStep}) {
  const navigate = useNavigate();

  const calAdultPrice = () => {
    return (parseFloat(bookingData.adults) * parseFloat(bookingData.ticketPrice) * 1).toFixed(2);
  }

  const calChildPrice = () => {
    return (parseFloat(bookingData.children) * parseFloat(bookingData.ticketPrice) * 0.5).toFixed(2);
  }

  const calTotal = () => (
    (parseFloat(calAdultPrice()) + parseFloat(calChildPrice())).toFixed(2)
  )

  // Handling purchasing event
  const handlePurchase = () =>{
    console.log('Purchasing');
    navigate(0);
  }


  return (
    <Box sx={{display:'flex', flexDirection:'column', justifyContent:'space-between', height:'100%'}}>
      <Box sx={{display:'flex', flexDirection:'column', gap:'10px'}}>
        <Texts variant={'h5'}> Billing Infomation </Texts>

        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Texts>Adult Tickets x {bookingData.adults}</Texts>
          </Grid>
          <Grid item xs={6} textAlign='right'>
            <Texts>LKR {calAdultPrice()}</Texts>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Texts>Child Tickets x {bookingData.children}</Texts>
          </Grid>
          <Grid item xs={6} textAlign='right'>
            <Texts>LKR {calChildPrice()}</Texts>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Texts>Booking Fee</Texts>
          </Grid>
          <Grid item xs={6} textAlign='right'>
            <Texts>LKR {parseFloat(bookingData.bookingFee).toFixed(2)}</Texts>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Texts>Discounts</Texts>
          </Grid>
          <Grid item xs={6} textAlign='right'>
            <Texts>- LKR {parseFloat(bookingData.discounts).toFixed(2)}</Texts>
          </Grid>
        </Grid>

        <Divider sx={{border:'none', borderTop:'1px black solid'}}/>

        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Texts variant={'h6'} fontColor='#ff9900'>Total</Texts>
          </Grid>
          <Grid item xs={6} textAlign='right' >
            <Texts variant={'h6'} fontColor='#ff9900'>LKR {calTotal()}</Texts>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{display:'flex', justifyContent:'space-between'}}>
        <Button variant='outlined' sx={{width: '120px'}} onClick={()=>{setActiveStep(activeStep-1)}}>Back</Button>
        <Button variant='contained' sx={{width: '120px'}} onClick={handlePurchase}>Purchase</Button>
      </Box>
    </Box>
  )
}
