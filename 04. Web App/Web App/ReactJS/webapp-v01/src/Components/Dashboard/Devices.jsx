import React, { useEffect, useState } from 'react'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import TabletIcon from '@mui/icons-material/Tablet';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { handleNotifications } from '../MyNotifications/FloatingNotifications';
import { Post, Request } from '../../APIs/NodeBackend';
import { useNavigate } from 'react-router-dom';

export default function Devices({setIsLogged, language}) {
  const navigate = useNavigate();

  // Getting userID from local storage
  const userID = JSON.parse(localStorage.getItem('userId'));

  // Device data
  const [devices, setDevices] = useState({});

  // Termination status
  const [isTerminated, setIsTerminated] = useState('none');

  useEffect(()=>{
    console.log('Getting devices');
    if(isTerminated === true || isTerminated==='none'){
      getDevices(userID);
      setIsTerminated(false);
    }
  }, [isTerminated, userID])

  // Requesting device data from node backend
  const getDevices = async (value) => {
    // Creating data object
    const data = {
      type: 'Req4',
      data: value
    }
    //console.log(`request message::   type: ${data.type}      data: ${data.data}`);

    try {
        const serverResponse = await Request(data, 'logs/users');
        console.log(`Devices:: ${JSON.stringify(serverResponse.data)}`);
        setDevices(serverResponse.data);
    } catch (error) {
        console.error('Error fetching devices:', error);
    }
  } ;

  // Function to terminate session
  const sessionTerminate = async (values) =>{
    // Creating data object
    const data = {
      type: 'Post3',  // Terminate session from our backend
      data: {
        userID: values.userID,
        MAC: values.mac,
        browser: values.browser,
      }
    }
    console.log(`post message::   type: ${data.type}      data: ${JSON.stringify(data.data)}`);

    try {
        await Post(data, 'logs/users');
        setIsTerminated(true);
    } catch (error) {
        console.error(`Error in terminating session: ${error} \n Refresh your browser.`);
    }
  }
  
  // handle logout button
  const logout = () =>{
    setIsLogged(false);
    navigate('/');
  }

  // Handle Button Click
  const handleButton = (e) =>{
    console.log(`Button is Clicked. Terminate the session with MAC: ${e.target.value} , ${e.target.name}.`);
    handleNotifications({
      type:'success', 
      title:'Successfull Termination', 
      body:`Successfully terminate the session with<br/>MAC: .`
    });

    // Function to API call with backend
    sessionTerminate({userID:userID, mac:e.target.value, browser:e.target.name});
  }

  return (
    <Paper 
      sx={{
        display:'flex',
        width: 'calc(100% - 50px)',
        height: 'auto',
        opacity: '80%',
        maxHeight: 'calc(76vh - 50px)',
        overflow: 'auto',
        margin: '20px'
      }}
    >
      <TableContainer>
        <Table>
          <TableBody>
            {devices.length>0 ? (devices.map((row)=>(
              <TableRow key={row.logID}>
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
                  {(row.date !== 'Your Current Session') ? (
                    <Typography sx={{whiteSpace: 'nowrap'}}>{row.date} at {row.time}</Typography>
                  ) : (
                    <Typography sx={{whiteSpace: 'nowrap', textJustify: 'center'}}>{row.date} <CheckCircleOutlineIcon color='success' fontSize="17px"/></Typography>
                  )}
                  <Typography sx={{whiteSpace: 'nowrap'}}>{row.browser}</Typography>                  
                </TableCell>

                <TableCell sx={{width:'200px'}}>
                  {(row.date !== 'Your Current Session') ? (
                    <Button 
                      variant="outlined" 
                      size="normal"
                      name = {row.browser}
                      value = {row.MAC}
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
                  ) : (
                    <Button 
                      variant="outlined" 
                      size="normal"
                      name = {row.browser}
                      value = {row.MAC}
                      onClick={logout} 
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
                      Logout
                    </Button>
                  )}                  
                </TableCell>
              </TableRow>
            ))) : (<></>)} 
          </TableBody>
        </Table>
      </TableContainer>   
    </Paper>
  )
}
