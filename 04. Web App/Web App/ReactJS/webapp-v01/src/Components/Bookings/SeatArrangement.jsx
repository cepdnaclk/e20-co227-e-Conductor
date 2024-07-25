import { Grid, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Passengers from './Forms/Passengers'
import BusSeats from './MapArea/BusSeats'
import { ToastAlert } from '../MyNotifications/WindowAlerts';

export default function SeatArrangement({activeStep, setActiveStep, bookingData, setBookingData, steps, seats}) {
  // Calculating available seats
  const available  = parseInt(seats.seats, 10) - (seats.booked ? seats.booked.length : 0);
  
  // Variable to store selected seats
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [updateList, setUpdateList] = useState([]);

  // Variables to store passengers
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [passengers, setPassengers] = useState(0);

  // Variable to store error
  const [error, setError] = useState(false);

  // Validating selected seats
  useEffect(()=>{
    if(passengers < selectedSeats.length){
      ToastAlert({
        type: 'warning',
        title: 'Passengers are less than selected seats!',
      });
    }
  },[passengers, selectedSeats.length])

  // Validating input
  useEffect(()=>{
    const validating = () => {     
      const count = adults + children;
      if(available < count){
        setError(true);
      } else {
        setError(false);
        setPassengers(count);
      }
    }

    validating();
  },[adults, children]);

  // Handle back button
  const handleBack = () => {
    console.log('Goto step 3');
    setActiveStep(activeStep - 1);
  }

  // Handle continue button
  const handleNext = () => {
    console.log('Goto step 4');

    if(passengers>0 && passengers === selectedSeats.length && passengers === (adults + children)){
      // Update booking data
      setBookingData({...bookingData, seatNos:selectedSeats, full:adults, half:children});

      // Goto next step
      setActiveStep(activeStep + 1);
    }
    else{
      ToastAlert({
        type: 'error',
        title: 'The number of passengers are invalid.',
      });
    }    
  }

  // Handling selected seats
  const handleSeats = (seat) => {
    let newList = [...selectedSeats];
    
    //console.log('Selected: ' + seat);
    
    // Adding or removing the seat from the list
    if (selectedSeats.includes(seat)) {
      newList = newList.filter(item => item !== seat);
    } else {
      newList.push(seat);
    } 
    //console.log(`Updated List: ${updateList}   newList: ${newList}`);

    // Validating new list
    if (newList.length <= passengers) {
      setSelectedSeats(newList);
    } else if(newList.length < updateList.length){
      setSelectedSeats(newList);
    } else {
      ToastAlert({
        type: 'warning',
        title: 'Passengers are less than selected seats!',
      });
      //console.log('Modify passenger number');
    }
    setUpdateList(newList);
  }

  // Reset
  const reset = () =>{
    setAdults(0);
    setChildren(0);
    setError(false);
    setSelectedSeats([]);
    setUpdateList([]);
    setPassengers(0);

  }


  return (
    <Paper sx={{bgcolor:'ghostwhite', width: "100%", height:"fit-content",  display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'10px'}}>
      <Grid container sx={{width:'100%', display: 'flex', justifyContent:"space-between"}}>
        <Grid item xs={12} md={4} display='flex' justifyContent='center' alignItems='center'>
          <Passengers 
            steps={steps} 
            activeStep={activeStep}
            adults={adults}
            children={children}
            selectedSeats={selectedSeats} 
            available={available}
            error={error}
            reset={reset}
            setAdults={setAdults}
            setChildren={setChildren}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        </Grid>
        
        <Grid item xs={12} md={8} display='flex' justifyContent='center' alignItems='center'>
            <BusSeats 
              handleClick={handleSeats}
              totalSeats={seats.seats}
              bookedSeats={seats.booked}
              selectedSeats={selectedSeats}
            />
        </Grid>
      </Grid> 
    </Paper>
  )
}
