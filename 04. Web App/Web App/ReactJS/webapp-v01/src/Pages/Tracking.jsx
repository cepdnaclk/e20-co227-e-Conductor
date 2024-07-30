import { Box } from '@mui/material'
import React, { useState } from 'react'
import Texts from '../Components/InputItems/Texts'

export default function Tracking() {
  const [location, setLocation] = useState({
    lat:0,
    lng:0,
  })

  /* navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    setLocation({lat: latitude, lng: longitude});
    // Show a map centered at latitude / longitude.
  }); */

  navigator.geolocation.watchPosition(position => {
    const { latitude, longitude } = position.coords;
    setLocation({lat: latitude, lng: longitude});
    // Show a map centered at latitude / longitude.
  });

  return (
    <Box width={"100vw"} height={"calc(100vh - 100px)"} bgcolor={'lightblue'}>
      <Texts>Lat: {location.lat}</Texts>
      <Texts>Lng: {location.lng}</Texts>
    </Box>
  )
}
