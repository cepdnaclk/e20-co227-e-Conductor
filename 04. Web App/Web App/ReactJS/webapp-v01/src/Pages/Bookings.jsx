import React, { useEffect, useState } from 'react'
import { Grid, Paper } from '@mui/material'
import MapArea from '../Components/Bookings/MapArea/MapArea'
import BookingForm from '../Components/Bookings/Forms/BookingForm'
import './Home.css'

// Initial booking form
const bookingFrom = {
  userID: JSON.parse(localStorage.getItem('userId')) || JSON.parse(sessionStorage.getItem('userId')),
  name: '',
  email: '',
  mobile: '',
  from: {},
  to: {},
  issuedDate:'',
  issuedTime: '',
  date: '',
  seatNos:'',
  aproxDepT: '',
  aproxAriT: '',
  journey: '',
  full: '',
  half: '',
  price: '',
  shceduleId: '',
  discount: '',
}

export default function Bookings({ language, setLoading }) {
  // Variable to store active step
  const [activeStep, setActiveStep] = useState(0);

  // Variable to store booking information
  const [bookingData, setBookingData] = useState(bookingFrom);

  // Variable to store selected seats
  const [seats, setSeats] = useState([]);

  useEffect(()=>{
    console.log('bookingData: ' + bookingData);
  }, [bookingData])

  return (
    <Paper sx={{bgcolor:'ghostwhite', width: "100%", height:"fit-content",  display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'10px'}}>
      <Grid container sx={{width:'100%', display: 'flex', justifyContent:"space-between"}}>
        <Grid item xs={12} md={4} display='flex' justifyContent='center' alignItems='center'>
          <BookingForm activeStep={activeStep} setActiveStep={setActiveStep} bookingData={bookingData} setBookingData={setBookingData} seats={seats} />
        </Grid>
        
        <Grid item xs={12} md={8} display='flex' justifyContent='center' alignItems='center'>
          <MapArea activeStep={activeStep} setActiveStep={setActiveStep} bookingData={bookingData} setBookingData={setBookingData} seats={seats} setSeats={setSeats} />
        </Grid>
      </Grid> 
    </Paper>
  )
}
