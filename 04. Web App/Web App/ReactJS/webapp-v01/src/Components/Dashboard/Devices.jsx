import React, { useEffect, useState } from 'react'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import TabletIcon from '@mui/icons-material/Tablet';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { handleNotifications } from '../MyNotifications/FloatingNotifications';
import { Request } from '../../APIs/NodeBackend';
import { useNavigate } from 'react-router-dom';

export default function Devices({setIsLogged, language, setLoading}) {
  const navigate = useNavigate();
  const currentSession = JSON.parse(sessionStorage.getItem('sessionData'));

  // Getting userID from local storage
  const userID = JSON.parse(localStorage.getItem('userId') || JSON.parse(sessionStorage.getItem('userId')));

  // Device data
  const [devices, setDevices] = useState([]);
  const [currentDevice, setCurrentDevice] = useState({});

  // Termination status
  const [isTerminated, setIsTerminated] = useState('none');

  useEffect(()=>{
    //console.log(`Getting devices  isTerminated: ${isTerminated}`);
    if(isTerminated === true || isTerminated==='none'){
      //console.log(`Searching Devices`);
      getDevices(userID);
      setIsTerminated(false);
    }
  }, [isTerminated]);

  // Requesting device data from node backend
  const getDevices = async (value) => {
    // Creating data object
    const data = {
      type: 'Log4',     // Get device data from backend
      data: value
    }
    //console.log(`request message::   type: ${data.type}      data: ${data.data}`);
    try {
        setLoading(true);  // Enabling spinner
        const serverResponse = await Request(data, 'logs/users');
        //console.log(`Devices:: ${JSON.stringify(serverResponse.data)}`);
        const rows = serverResponse.data;
        const filteredRow = rows.filter(row => ((row.MAC === currentSession.MAC) && (row.browser === currentSession.browser)));
        //console.log(`filtered Row: ${JSON.stringify(filteredRow[0])}`);
        setCurrentDevice(filteredRow[0]);
        setDevices(rows);
    } catch (error) {
        console.error('Error fetching devices:', error);
    } finally {
      setLoading(false);  // Disabling spinner
    }
  } ;

  // Function to terminate session
  const sessionTerminate = async (values) =>{
    // Creating data object
    const data = {
      type: 'Log2',  // Terminate session from our backend
      data: {
        userID: values.userID,
        MAC: values.mac,
        browser: values.browser,
      }
    }
    //console.log(`post message::   type: ${data.type}      data: ${JSON.stringify(data.data)}`);

    try {
        // Need to update with checking status code
        setLoading(true);
        const serverResponse = await Request(data, 'logs/users');
        setIsTerminated(true);
        setLoading(false);

        if(serverResponse.data === 'success'){
          handleNotifications({
            type:'success', 
            title:'Successfull Termination', 
            body:`Successfully terminate the session with \n MAC: ${values.mac}.`
          });
        } else {
          handleNotifications({
            type:'error', 
            title:'Termination is Failed!', 
            body:`Termination is failed. Try again!`
          });
        }
        console.log('Setting isTerminated to true');
    } catch (error) {
        console.error(`Error in terminating session: ${error} \n Refresh your browser.`);
        handleNotifications({
          type:'warning', 
          title:'Network Error!', 
          body:`Your connection is unstable. Please reload page again!`
        });
    }
  }
  
  // handle logout button
  const logout = () =>{
    setIsLogged('false');
    navigate('/');
  }

  // Handle Button Click
  const handleButton = (e) =>{
    //sconsole.log(`Button is Clicked. Terminate the session with MAC: ${e.target.value} , ${e.target.name}.`);
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
            {Object.keys(currentDevice).length > 0 ? (
              <TableRow key={currentDevice.logID}>
                <TableCell align='center'>
                  {(() => {
                    switch (currentDevice.device) {
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
                  <Typography sx={{whiteSpace: 'nowrap'}}>MAC: {currentDevice.MAC}</Typography>
                </TableCell>

                <TableCell>
                  <Typography sx={{whiteSpace: 'nowrap'}}>{currentDevice.OS}</Typography>
                  <Typography sx={{whiteSpace: 'nowrap'}}>{currentDevice.country}</Typography>
                  <Typography sx={{whiteSpace: 'nowrap', textJustify: 'center'}}>Your Current Session <CheckCircleOutlineIcon color='success' fontSize="17px"/></Typography>
                  <Typography sx={{whiteSpace: 'nowrap'}}>{currentDevice.browser}</Typography>                  
                </TableCell>

                <TableCell align='center' sx={{width:'200px'}}>
                  <Button 
                    variant="outlined" 
                    size="normal"
                    name = {currentDevice.browser}
                    value = {currentDevice.MAC}
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
                </TableCell>
              </TableRow>  
            ) : (<></>)}
            {devices.length>1 ? (devices.map((row)=>(
                <TableRow key={row.logID}>
                {((row.MAC === currentSession.MAC) && (row.browser === currentSession.browser)) ? (<></>) : (<>
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
                    <Typography sx={{whiteSpace: 'nowrap'}}>{row.date} at {row.time} </Typography>
                    <Typography sx={{whiteSpace: 'nowrap'}}>{row.browser}</Typography>                  
                  </TableCell>

                  <TableCell align='center' sx={{width:'200px'}}>
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
                  </TableCell>
                </>)}
                </TableRow>
             ))) : (<></>) } 
          </TableBody>
        </Table>
      </TableContainer>   
    </Paper>
  )
}
