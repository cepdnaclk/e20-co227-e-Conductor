import { Box, IconButton, Skeleton, Typography } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useJsApiLoader, GoogleMap, Marker, InfoWindow} from '@react-google-maps/api';
import useCurrentGPSLocation from '../SessionData/useCurrentGPSLocation';
import { IoManSharp } from "react-icons/io5";
import { renderToString } from 'react-dom/server';
import { MdDirectionsBusFilled } from "react-icons/md";
import { FaVanShuttle } from "react-icons/fa6";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { GetRequest } from '../../APIs/NodeBackend';

// Default center location - Colombo Sri Lanka
const center = { lat: 6.927218696598834, lng: 79.86022185737559 };

// Dummy bus stops
const data = [
  {
    "id": "1",
    "name": "Kurunduwatte",
    "latitude": 7.243630047731192,
    "longitude": 80.59471319873906
  },
  {
    "id": "2",
    "name": "Akbar",
    "latitude": 7.25235057321553,
    "longitude": 80.59333382765641
  },
  {
    "id": "3",
    "name": "Peradeniya",
    "latitude": 7.2631666355550575,
    "longitude": 80.59296904470439
  },
  {
    "id": "4",
    "name": "Peradeniya",
    "latitude": 7.264348737954064,
    "longitude": 80.5927983201521
  },
  {
    "id": "5",
    "name": "Galaha Junction",
    "latitude": 7.2656183598161075,
    "longitude": 80.59577370836975
  },
  {
    "id": "6",
    "name": "Botanical Garden",
    "latitude": 7.2675836946042915,
    "longitude": 80.59648176923187
  },
  {
    "id": "7",
    "name": "Hospital",
    "latitude": 7.268000173687011,
    "longitude": 80.59916263694033
  },
  {
    "id": "8",
    "name": "Rajawaththa",
    "latitude": 7.268047028533296,
    "longitude": 80.60223751719053
  },
  {
    "id": "9",
    "name": "Dangolla Junction",
    "latitude": 7.270664240431243,
    "longitude": 80.60479764429803
  },
  {
    "id": "10",
    "name": "Gatambe",
    "latitude": 7.272281404312179,
    "longitude": 80.60606340111026
  },
  {
    "id": "11",
    "name": "Kandy Hospital",
    "latitude": 7.288209595790418,
    "longitude": 80.63166044283383
  }
];

export default function GoogleMaps({page, findMe, setFindMe, setLoading, from, setFrom, to, setTo}) {
  // Variable to store bus stops
  const [busStops, setBusStops] = useState([]);

  // Getting device current location
  const location = useCurrentGPSLocation();

  // variable to store map border
  const [border, setBorder] = useState({
    tl:{lng:'', lat:''},
    tr:{lng:'', lat:''},
    bl:{lng:'', lat:''},
    br:{lng:'', lat:''}
  })

  const mapRef = useRef();

  // Variable to store marker click state
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [marker, setMarker] = useState({ position:{}, tag:'' });

  // State to hold current zoom level
  const [zoomLevel, setZoomLevel] = useState(14);

  // Fetching bus stops
  useEffect(()=>{
    const fetch = async(margins) => {
      try {
        setLoading(true);  // Enabling spinner
        const sessionData = await GetRequest(margins, 'busstops/locations');
        console.log(`BusStops:: ${JSON.stringify(sessionData.data)}`);
        const mapData = {margins, locations:sessionData.data}
        sessionStorage.setItem('busStops', mapData);
        setBusStops(sessionData.data);
      } catch (error) {
        console.log(`error in fetching bus stops`);
      } finally {
        setLoading(false);  // Disabling spinner
      }
    }

    //fetch(border);
    setBusStops(data);
  },[border]);

  // Finding my current location
  useEffect(()=>{
    const showMyLocation = () => {
      if(location.loaded && !location.error){
        mapRef.current.panTo(location.coordinates);
      }
      else{
        alert(location.error.message);
      }
      setFindMe(false);
    }

    if(findMe){
      showMyLocation();
    }
  },[findMe]);

  // Handling marker click
  useEffect(()=>{
    if(infoWindowOpen) {
      setTimeout(() => {
        setInfoWindowOpen(false);
      }, 3000);
    }
  },[infoWindowOpen]);

  const handleMarkerClick = (e, tag) => {
    console.log('position:: ' + JSON.stringify(e));
    setInfoWindowOpen(true);
    setMarker({position:e.latLng, tag});
  }
  
  const handleInfoWindowCloseClick = () => {
    setInfoWindowOpen(false);
  };
  
  // Handling add button
  const addLocation = (e) => {
    console.log(`Add: ${JSON.stringify(marker)}`);
  }

















  

  

  // Update zoom level when map zoom changes
  const handleZoomChanged = useCallback(() => {
    if (mapRef.current) {
      setZoomLevel(mapRef.current.getZoom());
    }
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.addListener('zoom_changed', handleZoomChanged);
    }
  }, [handleZoomChanged]);

  // Loading Map API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  // Loading spinner
  if (!isLoaded)  return <Skeleton /> ;

  // Convert EmojiPeopleIcon to SVG string
  const ManIconSvg = renderToString(<IoManSharp style={{ fontSize: '35px', color: 'black' }} />);
  const BusIconSvg = renderToString(<MdDirectionsBusFilled style={{ fontSize: '20px', color: '#0066ff' }} />);
  const MyBusIconSvg = renderToString(<FaVanShuttle style={{ fontSize: '26px', color: '#cc0000' }} />);

  // Creating marker icons
  const createMarkerIcon = (svgString) => {
    const size = zoomLevel; // Adjust this factor to change marker size scaling
    return {
      url: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`,
      scaledSize: new window.google.maps.Size(size, size),
      anchor: new window.google.maps.Point(size / 2, size),
    };
  };

  const userLocationMarker = createMarkerIcon(ManIconSvg);
  const busMarker = createMarkerIcon(BusIconSvg);
  const myBusMarker = createMarkerIcon(MyBusIconSvg);
  
  // Unwanted POIs - Bus Stops
  const mapStyles = [{
    featureType: "transit.station.bus",
    stylers: [{ visibility: "off" }],
  }];

  return (
    <Box width='100%' height='100%'>
      <GoogleMap
        center={center}
        zoom={zoomLevel}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        options={{
          styles: mapStyles,         // Apply the custom styles here
          fullscreenControl: false,  // This line disables the fullscreen control
          streetViewControl: false,  // This line disables the Street View control (update)
          mapTypeControl: false,     // This line disables the map type control
          zoomControl: true,         // This line enables the zoom control
        }}
        onLoad={(map) => mapRef.current = map}
      >        
        {/* Rendering all bus stops */}
        {zoomLevel>12 && busStops.length>0 && busStops.map((busStop, idx) => 
          <Marker key={idx} position={{lat:busStop.latitude, lng:busStop.longitude}} icon={busMarker} onClick={(e)=>handleMarkerClick(e, busStop.name)}/>
        )}
        

        {/* Rendering Specific Components related to page */}
        {(()=>{
        switch (page) {
          case 'booking':{
            return (
              // Set user's current location
              location.loaded && !location.error && (
                <>
                  <Marker position={location.coordinates} icon={userLocationMarker} onClick={(e)=>handleMarkerClick(e, "Me")} />
                </>
              )
            );
          }    
          default:
            break;
        }        
        })()}
        
      {/* Rendering Info window */}
      {infoWindowOpen && (
        <InfoWindow position={marker.position} onCloseClick={handleInfoWindowCloseClick} >
          <Box sx={{width:'fit-content', height:'fit-content', minWidth:'100px', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Typography align='center' justifyContent='center' display='flex' > {marker.tag} </Typography>
            <IconButton color="primary" aria-label="add location" onClick={addLocation}>
              <AddCircleOutlineIcon />
            </IconButton>
          </Box>          
        </InfoWindow>
      )}
      </GoogleMap>
    </Box>
  );
}
