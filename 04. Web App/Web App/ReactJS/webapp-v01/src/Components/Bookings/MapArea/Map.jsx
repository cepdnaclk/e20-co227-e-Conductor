import React from 'react'
import LeafletMap from '../../Map/LeafletMapComponent'
import { Paper } from '@mui/material'

export default function Map() {
  return (
    <Paper sx={{width:'100%', height:'100%'}}>
      <LeafletMap/>
    </Paper>
  )
}
