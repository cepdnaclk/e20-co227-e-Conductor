import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function MyBusses() {
  return (
    <Box width={'100%'} height={'fit-content'} bgcolor={'ghostwhite'}>
      <Outlet/>
    </Box>
  )
}
