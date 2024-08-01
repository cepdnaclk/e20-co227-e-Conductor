import { Box, Card, Grid } from '@mui/material'
import Texts from '../Components/InputItems/Texts'
import React, { useEffect, useState } from 'react'
import GoogleMaps from '../Components/Map/GoogleMaps'
import { GetRequest, Request } from '../APIs/NodeBackend'
import { Navigate } from 'react-router-dom'

// Time step size
const TIME_STEP = 1000;

export default function Tracking({setLoading, language}) {
  // Calculating current time
  const [now, setNow] = useState('');

  // Get ticket ID and userID
  const userID = JSON.parse(localStorage.getItem('userId')) || JSON.stringify(sessionStorage.getItem('userId'));
  const ticketID = JSON.parse(sessionStorage.getItem('TicketID'));

  // Variable to hold tracking availability
  const [status, setStatus] = useState({
    loading: (userID && ticketID) ? true : false,
    available: false
  });

  // Variable to hold the bus info
  const [busInfo, setBusInfo] = useState({});

  // Variable to hold bus Live location
  const [liveLocation, setLiveLocation] = useState({});

  // Variable to hold the route points
  const [route, setRoute] = useState([]);

  // Variable to hold the estimated data
  const [estmData, setEstmData] = useState({});

  // Fetching busInfo and route points from the backend
  useEffect(()=>{
    const fetch = async() => {
      // Creating data object
      const data = {
        type: 'Tkt6',  // Requesting tracing details
        data:{
          ticketNo: ticketID,
          userID: userID
        }
      }

      try {
        setLoading(true);  // Enabling spinner
        const serverResponse = await Request(data, 'tickets');
        const {availability, routePoints, busInfo} = serverResponse.data;
        //console.log(`Tracking availability: ${availability}\nRoutes: ${JSON.stringify(routePoints)} \nbusInfo: ${JSON.stringify(busInfo)}`);
        setStatus({
          loading: false,
          available: availability === 'true' ? true : false
        });

        if (availability === 'true' ){
          setBusInfo(busInfo);
          setRoute(routePoints);
        }

      } catch (error) {
        console.log(`Error in fetching tracking data!`);
      } finally {
        setLoading(false);  // Disabling spinner
      }
    }

    fetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  // Fetching bus live location
  useEffect(() => {
    if (!status.available) return;

    let isMounted = true; // To handle cleanup

    const fetchLocation = async () => {
      const data = busInfo.regNo;

      //console.log(`Bus Number: ${data}`);

      try {
        const serverResponse = await GetRequest(data, 'tracking/bus');
        if (isMounted) {
          //console.log(`Live location: ${JSON.stringify(serverResponse.data)}`);
          setLiveLocation(serverResponse.data);
        }
      } catch (error) {
        console.error('Error in getting bus live location!', error);
      }
    };

    const intervalId = setInterval(fetchLocation, TIME_STEP);

    return () => {
      isMounted = false;
      clearInterval(intervalId); // Clean up interval on component unmount
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status.available]);

  // Fetching estimation details
  useEffect(() => {
    if (!status.loading && !status.available) return;

    let isMounted = true;

    const fetchEstimationDetails = async () => {
      // Updating current time
      const d = new Date();
      const hours = d.getHours().toString().padStart(2, '0');
      const minutes = d.getMinutes().toString().padStart(2, '0');
      setNow(`${hours}:${minutes}`);

      const data = {
        userID: userID,
        ticketID: ticketID
      }
      try {
        const response = await GetRequest(data, 'tracking/estm');
        if (isMounted) {
          setEstmData(response.data);
        }
      } catch (error) {
        console.error('Error fetching estimation details:', error);
      }
    };

    const estimationIntervalId = setInterval(fetchEstimationDetails, TIME_STEP*10);

    return () => {
      isMounted = false;
      clearInterval(estimationIntervalId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return ( !status?.loading && (status?.available ?
    <Box width={"100%"} height={"fit-content"} bgcolor={"ghostwhite"} padding={"20px"}>
      <Card sx={{width:'calc(100%)', padding:'8px 20px', mb:"20px", borderRadius:'10px', bgcolor:'#1976d2'}}>
        <Grid container spacing={2} >
          <Grid textAlign={"center"} item xs={12} lg={6} >
            <Texts fontColor='white' variant={'h5'} >{busInfo.route}</Texts> 
            <Texts fontColor='white'>{busInfo.regNo} | {busInfo.org} | {busInfo.service} | {busInfo.routeType} </Texts> 
          </Grid>
          
          <Grid textAlign={"center"} item xs={12} sm={6} lg={3}>
            <Texts fontColor='white' variant={"h5"}>{estmData.speed} km/h</Texts>
            <Texts fontColor='white' >Bus Speed</Texts>
          </Grid>

          <Grid textAlign={"center"} item xs={12} sm={6} lg={3}>
            {now > estmData.fromArT ? 
            <>
              <Texts fontColor='white' variant={"h5"}>{estmData.toArT} Hrs</Texts>
              <Texts fontColor='white'>Estimated Arrival Time (Destination)</Texts>
            </> : <>
              <Texts fontColor='white' variant={"h5"}>{estmData.fromArT} Hrs</Texts>
              <Texts fontColor='white'>Estimated Arrival Time (Origin)</Texts>
            </>}
            
          </Grid>
        </Grid>
      </Card>

      <Card sx={{width:'100%', height:'calc(100vh - 240px)', mb:"20px", borderRadius:'10px'}} >
        {Object.keys(liveLocation).length > 0 && 
        <GoogleMaps
          page={'busTracking'}
          busData={busInfo}
          routeLocations={route}
          busLocation={liveLocation}
          estmData={estmData}
        />}
      </Card>
    </Box> 
    : 
    <Box width={"100%"} height={"calc(100vh - 500px)"} bgcolor={"ghostwhite"} padding={"20px"}>
      <Navigate to={'/forbidden'} />
    </Box>)
  )
}
