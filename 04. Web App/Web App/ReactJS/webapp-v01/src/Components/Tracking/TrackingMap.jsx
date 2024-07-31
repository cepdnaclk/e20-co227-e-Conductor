import { Box } from '@mui/material'
import React from 'react'
import GoogleMap from '../Map/GoogleMaps'

export default function TrackingMap() {
  return (
    <Box width={"100%"} height={"100%"}>
        <GoogleMap
            page={"busTracking"}
        />
    </Box>
  )
}
