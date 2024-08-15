import { Grid, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BusFilter from './Forms/BusFilter'
import Buslist from './MapArea/BusList'
import { Request } from '../../APIs/NodeBackend'
import { OnceFlyInX } from '../Animations/Entrance.Once'

export default function BusList({ activeStep, setActiveStep, bookingData, setBookingData, steps, setLoading, setSeats }) {
  // Variable to store original schedule data
  const [buses, setBuses] = useState([]);

  // Variable to store service type filter
  const [serviceFilter, setServiceFilter] = useState([]);

  // Variable to store Route type filter
  const [routeFilter, setRouteFilter] = useState([]);

  // Variable to store organization category filter
  const [orgFilter, setOrgFilter] = useState([]);

  // Fetch schedule information from node backend
  useEffect(() => {
    const fetch = async (values) => {
      // Creating data object
      const data = {
        type: 'Sdl1',
        data: values  // from, to, date
      };
      //console.log(`request message::   type: ${data.type}      data: ${JSON.stringify(data.data)}`);

      try {
        setLoading(true);  // Enabling spinner
        const serverResponse = await Request(data, 'schedule');
        //console.log(`serverResponse:: ${JSON.stringify(serverResponse.data)}`);
        setBuses(serverResponse.data);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      } finally {
        setLoading(false);  // Disabling spinner
      }
    };

    fetch({
      from: bookingData.from.id,
      to: bookingData.to.id,
      date: bookingData.date
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingData]);

  // Handling Back Button
  const handleBack = () => {
    setActiveStep(activeStep - 1); // Goto previous step
  };

  // Handle Continue Button
  const handleNext = (e) => {
    const bus = buses.filter(item => item.id === e.target.id)[0];
    const {id, departure, arrival, price, journey, seats, booked} = bus;
    sessionStorage.setItem('bus', JSON.stringify(bus));
    //console.log('bus: '+JSON.stringify(bus));

    // Update booking data
    setBookingData({...bookingData, shceduleId:id, aproxDepT:departure, aproxAriT:arrival, price:price, journey:journey });

    // Update seat infomation
    setSeats({seats, booked});

    // Goto next step
    setActiveStep(activeStep + 1);
  }

  // Filtering function
  function filterByPreferance(){
    let filteredList = buses;

    // Step 1 : Filter by service type
    if(serviceFilter.length > 0) { 
      filteredList = filteredList.filter(item => serviceFilter.includes(item.service.toLowerCase()));
    }

    // Step 2 : Filter by route type
    if(routeFilter.length > 0) {
      filteredList = filteredList.filter(item => routeFilter.includes(item.routeType.toLowerCase()));
    }

    // Step 2 : Filter by route type
    if(orgFilter.length > 0) {
      filteredList = filteredList.filter(item => orgFilter.includes(item.org.toLowerCase()));
    }

    //console.log(`Filtered List:: ${JSON.stringify(filteredList)}`);
    return filteredList;
  }

  return (
    <OnceFlyInX direction='right'>
      <Paper sx={{ bgcolor: 'ghostwhite', width: "100%", height: "fit-content", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
        <Grid container sx={{ width: '100%', display: 'flex', justifyContent: "space-between" }}>
          <Grid item xs={12} md={4} display='flex' justifyContent='center' alignItems='center'>
            <BusFilter
              activeStep={activeStep}
              steps={steps}
              handleBack={handleBack}
              setServiceFilter={setServiceFilter}
              setRouteFilter={setRouteFilter}
              setOrgFilter={setOrgFilter}
            />
          </Grid>
          
          <Grid item xs={12} md={8} display='flex' justifyContent='center' alignItems='center'>
            <Buslist
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              buses={filterByPreferance()}
              handleClick={handleNext}
            />
          </Grid>
        </Grid>
      </Paper>
    </OnceFlyInX>
  );
}
