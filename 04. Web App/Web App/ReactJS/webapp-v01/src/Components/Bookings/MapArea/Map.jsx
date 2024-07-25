import React from 'react'
import LeafletMap from '../../Map/LeafletMapComponent'
import { Paper } from '@mui/material'
import GoogleMaps from '../../Map/GoogleMaps'

export default function Map({findMe, setFindMe, from, setFrom, to, setTo, setLoading}) {
  return (
    <Paper sx={{width:'calc(100% - 20px)', height:'70vh', minHeight:'400px', gap:'20px', margin:'10px 0'}}>
      {/* <LeafletMap 
        page={'booking'}
        findMe={findMe}
        setFindMe={setFindMe}
      /> */}
      {/* <GoogleMaps 
        page={'booking'}
        findMe={findMe}     setFindMe={setFindMe}
        from={from}         setFrom={setFrom}
        to={to}             setTo={setTo}
        setLoading={setLoading}
      /> */}
    </Paper>
  )
}
