import { Box } from '@mui/material';
import { APIProvider, Map } from '@vis.gl/react-google-maps'
import React, { useEffect } from 'react'
import Directions from './Directions';
import { PersonMarker, ToMarker } from './AdvancedMarkers';
import useBusLiveLocation from '../SessionData/useBusLiveLocation';
import { GetRequest, Request } from '../../APIs/NodeBackend';


// Default center location - Colombo Sri Lanka
const center = { lat: 6.927218696598834, lng: 79.86022185737559 };

const stops = [ 
    { "lat": 7.243630047731192, "lng": 80.59471319873906 },
    { "lat": 7.25235057321553, "lng": 80.59333382765641 },
    { "lat": 7.2631666355550575, "lng": 80.59296904470439 },
    { "lat": 7.2656183598161075, "lng": 80.59577370836975 },
    { "lat": 7.2675836946042915, "lng": 80.59648176923187 },
    { "lat": 7.268000173687011, "lng": 80.59916263694033 },
    { "lat": 7.268047028533296, "lng": 80.60223751719053 },
    { "lat": 7.270664240431243, "lng": 80.60479764429803 },
    { "lat": 7.288209595790418, "lng": 80.63166044283383 }
]

const p1 = { "lat": 7.243630047731192, "lng": 80.59471319873906 };
const p2 = { "lat": 7.415043808414396, "lng": 80.31872010492351 };

const TIME_STEP = 1000;

export default function TempMap() {
  const liveLocation = useBusLiveLocation();

  // Fetching bus live location and send to the DB
  useEffect(() => {
    if (!liveLocation.loaded) return;

    let isMounted = true; // To handle cleanup

    const sendLocation = async () => {
      const data = {
        regNo: 'NA-1234',
        lat: liveLocation.coordinates.lat || 0,
        lng: liveLocation.coordinates.lng || 0,
        speed: liveLocation.coordinates.speed || 0,
      }

      console.log(`Bus Data: ${JSON.stringify(data)}`);

      try {
        const serverResponse = await Request(data, 'tracking/livebus');
        if (isMounted) {
          console.log(`Sending Live location: ${JSON.stringify(serverResponse.data)}`);
        }
      } catch (error) {
        console.error('Error in sending bus live location!', error);
      }
    };

    const intervalId = setInterval(sendLocation, TIME_STEP);

     return () => {
      isMounted = false;
      clearInterval(intervalId); // Clean up interval on component unmount
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [liveLocation]);

  return (
    <Box width={"100vw"} height={"100vh"}>
        <APIProvider
            apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            onLoad={()=>console.log("Map is loaded")}
        >
            <Map 
                mapId='DEMO-MAP-ID'
                defaultZoom={13}
                defaultCenter={center}
                reuseMap
            >
                <PersonMarker position={{lat:liveLocation?.coordinates?.lat, lng:liveLocation?.coordinates?.lng}}/>
                <ToMarker position={stops[0]} />
                <Directions point1={{lat:liveLocation?.coordinates?.lat, lng:liveLocation?.coordinates?.lng}}  point2={stops[0]}/>
                {/* <Directions p1={stops[1]}  p2={stops[2]}/> */}
                {/* {stops.map((stop, index) => {
                    if (index < stops.length - 1) {
                        return <Directions key={index} point1={stop} point2={stops[index + 1]} />;
                    }
                        return null; // Ensuring the last element doesn't return anything
                    })
                } */}

            </Map>
        </APIProvider>
    </Box>
    
  )
}
