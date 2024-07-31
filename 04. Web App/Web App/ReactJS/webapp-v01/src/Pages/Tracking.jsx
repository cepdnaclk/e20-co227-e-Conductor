import { Box, Card, Grid } from '@mui/material'
import Texts from '../Components/InputItems/Texts'
import React from 'react'
import TrackingMap from '../Components/Tracking/TrackingMap'

// Dummy data
const data = {
  regNo: "NA-1234",
  route: "602 | Kandy - Kurunegala",
  org: 'SLTB',
  service: 'Semi-Luxury',
  routeType: 'expressway'
}

// Dummy live data
const liveData={
  location:{lat:0, lng:0},
  speed: "40.00",
  arivalT: "10:23"
}

export default function Tracking() {
  return (
    <Box width={"100%"} height={"fit-content"} bgcolor={"ghostwhite"} padding={"20px"}>
      <Card sx={{width:'calc(100%)', padding:'8px 20px', mb:"20px", borderRadius:'10px', bgcolor:'#9CC0F9'}}>
        <Grid container spacing={2} margin={"0 0 15px 0"}>
          <Grid textAlign={"center"} item xs={12} lg={6} >
            <Texts fontColor='' variant={'h5'} >{data.route}</Texts> 
            <Texts>{data.regNo} | {data.org} | {data.service} | {data.routeType} </Texts> 
          </Grid>
          
          <Grid textAlign={"center"} item xs={12} sm={6} lg={3}>
            <Texts variant={"h5"}>{liveData.speed} km/h</Texts>
            <Texts >Bus Speed</Texts>
          </Grid>

          <Grid textAlign={"center"} item xs={12} sm={6} lg={3}>
            <Texts variant={"h5"}>{liveData.arivalT} Hrs</Texts>
            <Texts> Estimated Arrival Time</Texts>
          </Grid>
        </Grid>
      </Card>

      <Card sx={{width:'100%', height:'calc(100vh - 270px)', mb:"20px", borderRadius:'10px'}} >
        <TrackingMap />
      </Card>
    </Box>
  )
}
