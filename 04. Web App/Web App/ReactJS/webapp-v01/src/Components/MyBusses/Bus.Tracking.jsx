import { Box, Card, IconButton, Paper, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import GoogleMaps from '../Map/GoogleMaps'
import ChipSelect from '../InputItems/ChipSelect'
import SearchIcon from '@mui/icons-material/Search';
import { GetRequest } from '../../APIs/NodeBackend';

// Time step for fetching locations
const TIME_STEP = 1000;

export default function BusTracking({language, setLoading}) {
  const userID = JSON.parse(localStorage.getItem('userId')) || JSON.parse(sessionStorage.getItem('userId'));

  // Variable to hold the temparary selected bus list
  const [tempList, setTempList] = useState([]);

  // Variable to hold the confirmed bus list
  const [busList, setBusList] = useState([]);

  // Variable to hold the bus numbers
  const [busNumbers, setBusNumbers] = useState([]);

  // Variable to hold the bus location data
  const [busLocations, setBusLocations] = useState({
    loaded: false,
    data: {}
  });

  // Handle search button
  const handleClick = () => {
    if(tempList.length > 0){
      console.log('bus list is updated');
      setBusList(tempList);
    }
  };

  // Fetching user's bus numbers
  useEffect(()=>{
    const GetBusNumbers = async() => {
      try {
        setLoading(true);  // Enabling spinner
        const serverResponse = await GetRequest(userID, 'bus/mybuses');
        console.log('My Buses: ', serverResponse.data);
        setBusNumbers(serverResponse.data);
      } catch (error) {
        console.log(`Error in fetching my buses.`);
      } finally {
        setLoading(false);  // Disabling spinner
      }
    }

    GetBusNumbers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetching bus live location
  useEffect(() => {
    if (busList.length === 0) return;

    let isMounted = true; // To handle cleanup

    const fetchLocation = async () => {
      try {
        const serverResponse = await GetRequest(busList, 'tracking/mybuses');
        if (isMounted) {
          //console.log(`Live location: ${JSON.stringify(serverResponse.data)}`);
          setBusLocations({loaded:true, data:serverResponse.data});
        }
      } catch (error) {
        console.error('Error in getting bus live location!', error);
      }
    };

    const intervalId = setInterval(fetchLocation, TIME_STEP);

    return () => {
      isMounted = false;
      clearInterval(intervalId); // Clean up interval on component unmount
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busList]);

  return (
    <Box width={'100%'} height={'calc(100vh - 100px)'} bgcolor={'ghostwhite'} display={'flex'} justifyContent={'space-around'} alignItems={'center'} flexDirection={'column'}>
      <Box width={'calc(100% - 40px)'} height={'calc(100% - 40px)'} >
        <Card sx={{width:'fit-content', height:'fit-content', padding:'5px', zIndex:5, opacity:'90%', position:'relative', top:{xs:3, sm:10}, left:{xs:3, sm:10}, display:'flex', justifyContent:{xs:'space-around', sm:'start'}, alignItems:'center'}}>
          <ChipSelect names={busNumbers} setValues={setTempList} values={tempList}/>
          <Tooltip title={'Search Buses'}>
            <IconButton onClick={handleClick}>
              <SearchIcon/>
            </IconButton>
          </Tooltip>
        </Card>

        <Paper sx={{width:'100%', height:'100%', boxShadow:1, position:'relative', top:-82, left:0}}>
          <GoogleMaps
            page={'myBuses'}
            myBusesLocation={busLocations}
          />          
        </Paper>
      </Box>
    </Box>
  )
}
