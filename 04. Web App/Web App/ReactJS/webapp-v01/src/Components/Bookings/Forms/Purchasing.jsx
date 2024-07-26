import { Box, Button, Divider, Grid, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Texts from '../../InputItems/Texts'
import { useNavigate } from 'react-router-dom';
import Stepper from '../../ProgressBars/Stepper';
import { Request } from '../../../APIs/NodeBackend';
import { ToastAlert } from '../../MyNotifications/WindowAlerts';


export default function Purchasing({bookingData, activeStep, steps, handleBack, setBookingData, setLoading}) {
  const navigate = useNavigate();

  // Variable to store confirmation state
  const [confirm, setConfirm] = useState(null);

  // Update final infomations
  useEffect(()=>{
    // Requesting personal infomation
    const fetch = async (value) => {
      // Creating data object
      const data = {
      type: 'Req8',
      data: value
      }
      //console.log(`request message::   type: ${data.type}      data: ${data.data}`);

      try {
          setLoading(true);  // Enabling spinner
          const serverResponse = await Request(data, 'users');
          //console.log(`serverResponse:: ${JSON.stringify(serverResponse.data)}`);
          const {name, mobile, email} = serverResponse.data;

          // NEED TO DO ERROR HANDLING

          // Calculating date and time
          const session = new Date();
          const date = session.toDateString();
          const time = session.toLocaleTimeString();

          setBookingData({...bookingData, issuedDate:date, issuedTime:time, name, mobile, email});
      } catch (error) {
          console.error('Error adding user:', error);
      } finally {
          setLoading(false);  // Disabling spinner
      }
    };

    fetch(bookingData.userID);
  },[]);

  // Confirmation handle
  useEffect(()=>{
    const refresh = () => {
      setTimeout(() => {
        //console.log('refresh');
        navigate(0);  
      }, (3001));
    }

    if(confirm === true) {
      ToastAlert({
        type: 'success',
        title: 'Payment Successfull!',
        onClose: refresh
      });
    } else if(confirm !== null){
      ToastAlert({
        type: 'error',
        title: 'Payment Failed!'
      });
      setConfirm(null);
    }
  },[confirm])

  // Ticket price calculation
  const calAdultPrice = () => {
    return (parseFloat(bookingData.full) * parseFloat(bookingData.price) * 1).toFixed(2);
  }

  const calChildPrice = () => {
    return (parseFloat(bookingData.half) * parseFloat(bookingData.price) * 0.5).toFixed(2);
  }

  const calTotal = () => (
    (parseFloat(calAdultPrice()) + parseFloat(calChildPrice()) - parseFloat(bookingData.discount)).toFixed(2)
  )

  // Handling purchasing event
  const handlePurchase = () =>{
    console.log('Purchasing');
    requestConfirmation(bookingData);
  }

  // API to send billing infomation
  const requestConfirmation = async (value) => {
    // Creating data object
    const data = {
    type: 'Tkt3',
    data: value
    }
    //console.log(`request message::   type: ${data.type}      data: ${JSON.stringify(data.data)}`);

    try {
        setLoading(true);  // Enabling spinner
        const serverResponse = await Request(data, 'tickets');
        //console.log(`ServerResponse:: ${JSON.stringify(serverResponse.data)}`);
        setConfirm(serverResponse.data === 'success' ? true : false);
    } catch (error) {
        console.error('Error adding user:', error);
    } finally {
        setLoading(false);  // Disabling spinner
    }
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

      <Box sx={{display:'flex', flexDirection:'column', justifyContent:'space-between', width:'100%', height:'calc(100% - 100px)'}}>
        <Box sx={{display:'flex', flexDirection:'column', gap:'10px'}} mt={3}>
          <Grid container spacing={1}>
            <Grid item xs={7}>
              <Texts>Adult Tickets x {bookingData.full}</Texts>
            </Grid>
            <Grid item xs={5} textAlign='right'>
              <Texts>LKR {calAdultPrice()}</Texts>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={7}>
              <Texts>Child Tickets x {bookingData.half}</Texts>
            </Grid>
            <Grid item xs={5} textAlign='right'>
              <Texts>LKR {calChildPrice()}</Texts>
            </Grid>
          </Grid>

          {/* <Grid container spacing={1}>
            <Grid item xs={6}>
              <Texts>Booking Fee</Texts>
            </Grid>
            <Grid item xs={6} textAlign='right'>
              <Texts>LKR {parseFloat(bookingData.bookingFee).toFixed(2)}</Texts>
            </Grid>
          </Grid> */}

          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Texts>Discounts</Texts>
            </Grid>
            <Grid item xs={6} textAlign='right'>
              <Texts>- LKR {parseFloat(bookingData.discount).toFixed(2)}</Texts>
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
          <Button variant='outlined' sx={{width: '120px'}} onClick={handleBack}>Back</Button>
          <Button variant='contained' sx={{width: '120px'}} onClick={handlePurchase}>Purchase</Button>
        </Box>
      </Box>
    </Paper>
  )
}
