import React, { useState } from 'react'
import Location from '../Components/Bookings/Location'
import BusList from '../Components/Bookings/BusList'
import SeatArrangement from '../Components/Bookings/SeatArrangement'
import Payment from '../Components/Bookings/Payment'

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
  discount: '0',
}

// Steps to the stepper
const steps = [
  'Add Locations',
  'Select Bus',
  'Select Seats',
  'Payment',
];

export default function Bookings({ language, setLoading }) {
  // Variable to store active step
  const [activeStep, setActiveStep] = useState(0);

  // Variable to store booking information
  const [bookingData, setBookingData] = useState(bookingFrom);

  // Variable to store seat infomation
  const [seats, setSeats] = useState({});

  /* useEffect(()=>{
    console.log('bookingData: ' + JSON.stringify(bookingData) + '\nSeat infomation: ' + JSON.stringify(seats));
  }, [bookingData, seats]) */

  return (
    (()=>{
      switch (activeStep) {
        case 1:
          return <BusList setActiveStep={setActiveStep} activeStep={activeStep} bookingData={bookingData} setBookingData={setBookingData} setLoading={setLoading} steps={steps} setSeats={setSeats} /> ;        
      
        case 2:
          return <SeatArrangement setActiveStep={setActiveStep} activeStep={activeStep} bookingData={bookingData} setBookingData={setBookingData} steps={steps} seats={seats} /> ;    

        case 3:
          return <Payment setActiveStep={setActiveStep} activeStep={activeStep} bookingData={bookingData} setBookingData={setBookingData} setLoading={setLoading} steps={steps}/> ;    

        default:
          return <Location setActiveStep={setActiveStep} activeStep={activeStep} bookingData={bookingData} setBookingData={setBookingData} setLoading={setLoading} steps={steps}/> ;
      }
    })()
  )
}
