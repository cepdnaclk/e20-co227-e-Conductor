import { Box } from '@mui/material'
import React from 'react'
import GoogleMap from '../Map/GoogleMaps'

export default function TrackingMap({busData, busLocation, routeLocations, estmData}) {
  return (
    <Box width={"100%"} height={"100%"}>
        <GoogleMap
          page={"busTracking"}
          busData={busData}
          routeLocations={routeLocations}
          busLocation={busLocation}
          estmData={estmData}
        />
    </Box>
  )
}
