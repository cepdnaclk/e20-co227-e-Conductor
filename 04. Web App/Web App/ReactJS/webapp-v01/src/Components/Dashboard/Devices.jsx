import React from 'react'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import TabletIcon from '@mui/icons-material/Tablet';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { handleNotifications } from '../MyNotifications/FloatingNotifications';

export default function Devices() {
  // Dummy data for devices
  const devices = [{
    "device": "Mobile",
    "MAC": "F5-EE-04-D0-72-1C",
    "OS": "Linux",
    "country": "Japan",
    "lastAccess": "Your Current Session"
  }, {
    "device": "PC",
    "MAC": "AC-E2-6B-53-E8-C5",
    "OS": "Mac OS",
    "country": "United States",
    "lastAccess": "2024-03-23"
  }, {
    "device": "PC",
    "MAC": "C4-3A-A6-C6-8B-C8",
    "OS": "Mac OS",
    "country": "China",
    "lastAccess": "2024-02-26"
  }, {
    "device": "Mobile",
    "MAC": "B5-7C-41-A2-70-4D",
    "OS": "Android",
    "country": "Sweden",
    "lastAccess": "2024-01-05"
  }, {
    "device": "PC",
    "MAC": "A5-16-86-12-84-F8",
    "OS": "Android",
    "country": "China",
    "lastAccess": "2023-07-09"
  }, {
    "device": "PC",
    "MAC": "8A-E4-22-4B-CB-F8",
    "OS": "Android",
    "country": "China",
    "lastAccess": "2023-07-29"
  }, {
    "device": "PC",
    "MAC": "08-88-F0-C9-49-73",
    "OS": "Mac OS",
    "country": "Kazakhstan",
    "lastAccess": "2023-07-27"
  }, {
    "device": "Mobile",
    "MAC": "79-FC-6F-57-39-CB",
    "OS": "Android",
    "country": "Brazil",
    "lastAccess": "2024-05-17"
  }, {
    "device": "Mobile",
    "MAC": "DE-E1-AA-65-3D-67",
    "OS": "Windows",
    "country": "Peru",
    "lastAccess": "2023-12-24"
  }, {
    "device": "Mobile",
    "MAC": "B5-7C-BA-94-E2-AF",
    "OS": "Linux",
    "country": "Portugal",
    "lastAccess": "2024-02-25"
  }, {
    "device": "Tablet",
    "MAC": "12-EB-4E-5E-DE-3F",
    "OS": "Windows",
    "country": "Brazil",
    "lastAccess": "2023-12-11"
  }, {
    "device": "Tablet",
    "MAC": "1F-FC-4C-10-D7-6D",
    "OS": "Windows",
    "country": "Brazil",
    "lastAccess": "2023-06-27"
  }, {
    "device": "Tablet",
    "MAC": "19-11-0A-54-BA-B7",
    "OS": "Windows",
    "country": "China",
    "lastAccess": "2023-08-19"
  }, {
    "device": "Tablet",
    "MAC": "42-5D-DA-4F-84-A1",
    "OS": "Linux",
    "country": "Brazil",
    "lastAccess": "2023-08-24"
  }, {
    "device": "Tablet",
    "MAC": "E9-FB-38-6C-CF-29",
    "OS": "Windows",
    "country": "China",
    "lastAccess": "2023-06-13"
  }, {
    "device": "PC",
    "MAC": "1C-45-C7-95-20-3F",
    "OS": "Windows",
    "country": "Malaysia",
    "lastAccess": "2023-12-18"
  }, {
    "device": "PC",
    "MAC": "4B-56-EB-44-24-41",
    "OS": "Android",
    "country": "Sweden",
    "lastAccess": "2023-08-05"
  }, {
    "device": "PC",
    "MAC": "8E-8F-7A-67-67-EA",
    "OS": "Mac OS",
    "country": "China",
    "lastAccess": "2023-12-14"
  }, {
    "device": "Mobile",
    "MAC": "DB-75-A9-7E-D2-9C",
    "OS": "Windows",
    "country": "North Korea",
    "lastAccess": "2023-12-22"
  }, {
    "device": "Mobile",
    "MAC": "9A-AC-0B-34-4A-C8",
    "OS": "Android",
    "country": "Portugal",
    "lastAccess": "2024-04-10"
  }, {
    "device": "Mobile",
    "MAC": "D5-F5-44-3B-FF-DB",
    "OS": "Android",
    "country": "China",
    "lastAccess": "2023-09-04"
  }, {
    "device": "Mobile",
    "MAC": "57-49-B0-D9-C5-7E",
    "OS": "Android",
    "country": "Philippines",
    "lastAccess": "2024-05-07"
  }, {
    "device": "Tablet",
    "MAC": "89-23-E1-F1-96-58",
    "OS": "Linux",
    "country": "China",
    "lastAccess": "2023-09-22"
  }, {
    "device": "Mobile",
    "MAC": "C6-B2-D9-3C-64-B2",
    "OS": "Linux",
    "country": "Venezuela",
    "lastAccess": "2023-09-12"
  }]
  
  // Handle Button Click
  const handleButton = (e) =>{
    console.log(`Button is Clicked. Terminate the session with MAC: ${e.target.value}.`);
    handleNotifications({
      type:'success', 
      title:'Successfull Termination', 
      body:`Successfully terminate the session with<br/>MAC: ${e.target.value}.`
    });
    // Function to API call with backend
  }

  return (
    <Paper 
      sx={{
        display:'flex',
        width: 'calc(100% - 50px)',
        height: 'auto',
        opacity: '80%',
        maxHeight: '76vh',
        minWidth: '290px',
        overflow: 'auto'
      }}
    >
      <TableContainer>
        <Table>
          <TableBody>
            {devices.length>0 ? (devices.map((row)=>(
              <TableRow key={row.MAC}>
                <TableCell align='center'>
                  {(() => {
                    switch (row.device) {
                      case 'PC':
                        return(<ComputerIcon sx={{fontSize: '50px'}}/>)
                      case 'Tablet':
                        return(<TabletIcon sx={{fontSize: '50px'}}/>)
                      case 'Mobile':
                        return(<PhoneAndroidIcon sx={{fontSize: '50px'}}/>)
                      default:
                        break;                    
                    }
                  })()}
                </TableCell>

                <TableCell>
                  <Typography sx={{whiteSpace: 'nowrap'}}>MAC: {row.MAC}</Typography>
                </TableCell>

                <TableCell>
                  <Typography sx={{whiteSpace: 'nowrap'}}>{row.OS}</Typography>
                  <Typography sx={{whiteSpace: 'nowrap'}}>{row.country}</Typography>
                  {(row.lastAccess !== 'Your Current Session') ? (
                    <Typography sx={{whiteSpace: 'nowrap'}}>Last accessed on: {row.lastAccess}</Typography>
                  ) : (
                    <Typography sx={{whiteSpace: 'nowrap', textJustify: 'center'}}>{row.lastAccess} <CheckCircleOutlineIcon color='success' fontSize="17px"/></Typography>
                  )}
                  
                </TableCell>

                <TableCell sx={{width:'200px'}}>
                  <Button 
                    variant="outlined" 
                    size="normal"
                    value={row.MAC}
                    onClick={handleButton} 
                    sx={{ color: 'black', 
                          borderColor: 'black', 
                          fontFamily: 'System-UI', 
                          fontWeight: 'bold',
                          whiteSpace:'nowrap',
                          '&:hover': { 
                            backgroundColor: 'rgb(0,0,0)',
                            color: 'white', 
                            border: 'none'
                          }
                        }}
                  >
                    Terminate
                  </Button>
                </TableCell>
              </TableRow>
            ))) : (<></>)} 
          </TableBody>
        </Table>
      </TableContainer>   
    </Paper>
  )
}
