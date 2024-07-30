import { Box } from '@mui/material'
import React, { useState } from 'react'
import Texts from '../Components/InputItems/Texts'

export default function Tracking() {
  const [location, setLocation] = useState({
    lat:0,
    lng:0,
    speed:0,
    heading:0,
    altitude: 0,
    accuracy: 0
  })

  /* navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    setLocation({lat: latitude, lng: longitude});
    // Show a map centered at latitude / longitude.
  }); */

  navigator.geolocation.watchPosition(position => {
    const { latitude, longitude, speed, heading, altitude, accuracy } = position.coords;
    setLocation({lat: latitude, lng: longitude, speed, altitude, accuracy, heading});
    // Show a map centered at latitude / longitude.
  });

  return (
    <Box width={"100vw"} height={"calc(100vh - 100px)"} bgcolor={'lightblue'}>
      <Texts>Lat: {location.lat}</Texts>
      <Texts>Lng: {location.lng}</Texts>
      <Texts>spd: {location.speed}</Texts>
      <Texts>hed: {location.heading}</Texts>
      <Texts>alt: {location.altitude}</Texts>
      <Texts>acc: {location.accuracy}</Texts>
    </Box>
  )
}
