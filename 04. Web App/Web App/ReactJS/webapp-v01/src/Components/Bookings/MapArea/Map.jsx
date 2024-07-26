import React from 'react'
import { Paper } from '@mui/material'
import GoogleMaps from '../../Map/GoogleMaps'

export default function Map({from, to, setLoading}) {
  return (
    <Paper sx={{width:'calc(100% - 20px)', height:'70vh', minHeight:'400px', gap:'20px', margin:'10px 0'}}>
      <GoogleMaps 
        page={'booking'}
        from={from}         
        to={to}
        setLoading={setLoading}
      />
    </Paper>
  )
}
