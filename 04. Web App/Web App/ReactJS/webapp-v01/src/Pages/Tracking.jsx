import { Box, Card, Grid } from '@mui/material'
import Texts from '../Components/InputItems/Texts'
import React, { useEffect, useState } from 'react'
import GoogleMaps from '../Components/Map/GoogleMaps'

// Dummy data about bus general info
const data = {
  refNo: "0000112",
  regNo: "NA-1234",
  route: "602 | Kandy - Kurunegala",
  org: 'SLTB',
  service: 'Semi-Luxury',
  routeType: 'expressway',
  startT: '06:10',
  from: {
    "name": "Kurunduwatte",
    "location" : { "lat": 7.243630047731192, "lng": 80.59471319873906 }    
  },
  to:  {
    "name": "Akbar",
    "location" : { "lat": 7.25235057321553, "lng": 80.59333382765641 }
  },
  start:  {
    "name": "Kandy Market",
    "location" : { "lat": 7.2933810742053575, "lng":80.63447065398826 }
  },
}

// Dummy live data
const liveData={ "lat": 7.288209595790418, "lng": 80.63166044283383 };

// Dummy estimation data
const estmData = {
  speed: "40.00",
  fromArT: "10:23",
  toArT: "10:50"
}

// Dummy route location data
const routeLocations = [ 
  { "lat": 7.243630047731192, "lng": 80.59471319873906 },
  { "lat": 7.2656183598161075, "lng": 80.59577370836975 },
  { "lat": 7.288209595790418, "lng": 80.63166044283383 },
  { "lat": 7.2933810742053575, "lng":80.63447065398826 },
]

export default function Tracking() {
  // Calculating current time
  const d = new Date();
  const now = `${d.getHours()}:${d.getMinutes()}`;

  // Get ticket ID and userID
  const userID = JSON.parse(localStorage.getItem('userId')) || JSON.stringify(sessionStorage.getItem('userId'));
  const ticketID = JSON.parse(sessionStorage.getItem('TicketID'));

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

    }
  },[]);

  return (
    <Box width={"100%"} height={"fit-content"} bgcolor={"ghostwhite"} padding={"20px"}>
      <Card sx={{width:'calc(100%)', padding:'8px 20px', mb:"20px", borderRadius:'10px', bgcolor:'#1976d2'}}>
        <Grid container spacing={2} >
          <Grid textAlign={"center"} item xs={12} lg={6} >
            <Texts fontColor='white' variant={'h5'} >{data.route}</Texts> 
            <Texts fontColor='white'>{data.regNo} | {data.org} | {data.service} | {data.routeType} </Texts> 
          </Grid>
          
          <Grid textAlign={"center"} item xs={12} sm={6} lg={3}>
            <Texts fontColor='white' variant={"h5"}>{estmData.speed} km/h</Texts>
            <Texts fontColor='white' >Bus Speed</Texts>
          </Grid>

          <Grid textAlign={"center"} item xs={12} sm={6} lg={3}>
            {now > liveData.fromArT ? 
            <>
              <Texts fontColor='white' variant={"h5"}>{estmData.toArT} Hrs</Texts>
              <Texts fontColor='white'>Estimated Arrival Time (Destination)</Texts>
            </> : <>
              <Texts fontColor='white' variant={"h5"}>{estmData.toArT} Hrs</Texts>
              <Texts fontColor='white'>Estimated Arrival Time (Origin)</Texts>
            </>}
            
          </Grid>
        </Grid>
      </Card>

      <Card sx={{width:'100%', height:'calc(100vh - 240px)', mb:"20px", borderRadius:'10px'}} >
        <GoogleMaps
          page={'busTracking'}
          busData={data}
          routeLocations={routeLocations}
          busLocation={liveData}
          estmData={estmData}
        />
      </Card>
    </Box>
  )
}
