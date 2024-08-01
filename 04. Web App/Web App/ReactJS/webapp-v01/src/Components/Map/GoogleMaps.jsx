import { Box, IconButton, Skeleton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { APIProvider, InfoWindow, Map } from '@vis.gl/react-google-maps';
import { BusMarker, BusStopMarker, FromMarker, PersonMarker, StartMarker, ToMarker } from './AdvancedMarkers';
import { GetRequest } from '../../APIs/NodeBackend';
import Texts from '../InputItems/Texts'
import useLiveLocation from '../SessionData/useLiveLocation';
import Directions from './Directions';

// Default center location - Colombo Sri Lanka
const center = { lat: 6.927218696598834, lng: 79.86022185737559 };

// Sri Lanka Border
const border = {
  north: 9.908972567284216,
  south: 5.927144834513064,
  east : 81.8873002690906,
  west : 79.6900346440906
}

// Unwanted POIs - Bus Stops
/* const mapStyles = [{
  featureType: "transit.station.bus",
  stylers: [{ visibility: "off" }],
}]; */

export default function GoogleMaps({page, from, to, busData, routeLocations, estmData, busLocation}) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Getting device current location
  const location = useLiveLocation();

  // Variable to hold Target location
  const [target, setTarget] = useState({active:false, coordinates:center});

  // Variable to track window
  const [infoWindow, setInfoWindow] = useState({
    state: false, // window is closed
    label:'',
    body:'',
    position: center,
  });

  // Goto my target location
  const showMyLocation = () => {
    if(location.loaded && !location.error){
      setTarget({active:true, coordinates:location.coordinates });
    }
    else{
      alert(location.error.message);
    }
  }

  // Variable to hold bus stops
  const [busStops, setBusStops] = useState([]);

  // variable to store map border
  const [camera, setCamera] = useState({});

  // Variable to hold current zoom level
  const [zoom, setZoom] = useState(13);

  // Variable to hold maximum and minimum bounds of map
  const [bounds, setBounds] = useState(JSON.parse(sessionStorage.getItem('bounds')) || {
    bNorth:0,
    bSouth:0,
    bEast:0,
    bWest:0
  })

  // Fetching bus stops API
  useEffect(()=>{
    // Storing algorithm
    const Store = (points) => {
      let storedData = JSON.parse(sessionStorage.getItem('busStopLocations')) || [];
      //console.log('StoredData:: ', JSON.stringify(storedData));
      
      const idList = storedData.map(point => point.id);
      //console.log('idList: ', JSON.stringify(idList));

      const newPoints = points.filter(point => !(idList.includes(point.id)));
      //console.log('newPoints: ', JSON.stringify(newPoints));

      storedData = [...storedData, ...newPoints];
      //console.log('updated list: ',JSON.stringify(storedData));

      sessionStorage.setItem('busStopLocations', JSON.stringify(storedData));
      sessionStorage.setItem('bound', JSON.stringify(bounds));
      setBusStops(storedData);
    }

    // API Call Function
    const fetch = async(margins) => {
      try {
        const sessionData = await GetRequest(margins, 'busstops/locations');
        //console.log(`BusStops:: ${JSON.stringify(sessionData.data)}`);
        const points = sessionData.data;
        if(points.length > 0){
          Store(points);
        } else {
          console.log('No data');
        }
      } catch (error) {
        console.log(`error in fetching bus stops`);
      }
    }

    fetch(camera);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[bounds]);

  // Finding the overall captured map area
  useEffect(()=>{
    let newBound = {};
    const { bNorth, bSouth, bEast, bWest } = bounds;
    const { north, south, east, west } = camera;
    //console.log(JSON.stringify(camera), '\n\n', JSON.stringify(border));
    
    // Update according to the visible zoom level and the Sri Lanka border
    if((zoom > 13) && (east > border.west) && (west < border.east) && (north > border.south) && (south < border.north)) {
      //console.log("updating...");

      // Checking north bound
      newBound.bNorth = (bNorth < north) || (bNorth === 0) ? north : bNorth ;

      // Checking south bound
      newBound.bSouth = (bSouth > south) || (bSouth === 0) ? south : bSouth ;

      // Checking east bound
      newBound.bEast  = (bEast  < east)  || (bEast === 0)  ? east  : bEast ;

      // Checking west bound
      newBound.bWest  = (bWest  > west)  || (bWest === 0)  ? west  : bWest ;
      
      // update bounds
      setBounds(newBound);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[camera]);

  // Show targets
  useEffect(()=>{
    if(!!from){
      setTarget({active:true, coordinates:from.location});
    } 
  }, [from]);

  useEffect(()=>{
    if(!!to){
      setTarget({active:true, coordinates:to.location});
    } 
  }, [to]); 

  // Window timeout
  useEffect(()=>{
    if(infoWindow.state === true) {
      setTimeout(() => {
        setInfoWindow({...infoWindow, state:false});
      }, 3000);
    }
  },[infoWindow]);

  return (
    <Box width='100%' height='100%'>
      <APIProvider
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        onLoad={()=>setIsLoaded(true)}
      >
        {!isLoaded ? <Skeleton /> : 
          <>
            <Map 
              mapId='DEMO-MAP-ID'
              defaultZoom={zoom}
              defaultCenter={page === "busTracking" ? busLocation : center}
              center={target.active ? target.coordinates : null}
              zoom={target.active ? 16 : null}
              onCenterChanged={()=>{setTarget({...target, active:false})}}
              fullscreenControl={false}
              streetViewControl={false}
              mapTypeControl={false}
              minZoom={8}
              maxZoom={20}
              reuseMap
              onCameraChanged={ e => {setCamera(e.detail.bounds); setZoom(e.detail.zoom);}}
              //styles={mapStyles}
            >
              {/* MAP COMPONENETS */}
              {/* Rendering Bus Stops */}
              {zoom > 14 && busStops.length > 0 && busStops.map(place => (
                <BusStopMarker key={place.id} title={place.name} position={place.location} onClick={()=>{setInfoWindow({state:true, position:place.location, label:place.name, body:place.routes})}} />
              ))}

              {(()=>{
                switch (page) {
                  case 'booking':{
                    return (
                      <>
                        {/* Rendering user's current location */}
                        {location.loaded && !location.error && <PersonMarker 
                          title={'Me'} 
                          position={location?.coordinates} 
                          onClick={()=>{setInfoWindow({
                            state:true, 
                            position:location?.coordinates, 
                            label:"My Location"
                          })}}
                        />}

                        {/* Rendering FROM - TO location */}
                        {!!(from) && <FromMarker title={from?.name} position={from?.location} onClick={()=>{setInfoWindow({state:true, position:from?.location, label:from?.name})}} />}
                        {!!(to) && <ToMarker title={to?.name} position={to?.location} onClick={()=>{setInfoWindow({state:true, position:to?.location, label:to?.name})}} />}
                      </>
                    );
                  }

                  case 'busTracking':{
                    return (
                      <>
                        {/* Rendering user's live location */}
                        {location.loaded && !location.error && <PersonMarker 
                          title={'Me'} 
                          position={location?.coordinates} 
                          onClick={()=>{setInfoWindow({
                            state:true, 
                            position:location?.coordinates, 
                            label:"My Location"
                          })}}
                        />}

                        {/* Rendering bus live location */}
                        {!!(busLocation) && <BusMarker 
                          title={busData.regNo} 
                          position={busLocation} 
                          onClick={()=>{setInfoWindow({
                            state:true, 
                            position:busLocation, 
                            label:busData?.regNo,
                            body: `${busData.route}\n${busData.org}\n${busData.service}\n${busData.routeType}`
                          })}} 
                        />}

                        {/* Rendering FROM, TO, and START locations */}
                        {!!(busData?.from) && <FromMarker 
                          title={busData.from?.name} 
                          position={busData.from?.location} 
                          onClick={()=>{setInfoWindow({
                            state:true, 
                            position:busData.from?.location, 
                            label:`Origin: ${busData.from?.name}`,
                            body: `Arrived at: ${estmData.fromArT} Hrs\nRoute: ${busData.route}`
                          })}} 
                        />}
                        {!!(busData?.to) && <ToMarker 
                          title={busData.to?.name} 
                          position={busData.to?.location} 
                          onClick={()=>{setInfoWindow({
                            state:true, 
                            position:busData.to?.location, 
                            label:`Destination: ${busData.to?.name}`,
                            body: `Arrived at: ${estmData.toArT} Hrs\nRoute: ${busData.route}`
                          })}} 
                        />}
                        {!!(busData?.start) && <StartMarker 
                          title={busData.start?.name} 
                          position={busData.start?.location} 
                          onClick={()=>{setInfoWindow({
                            state:true, 
                            position:busData.start?.location, 
                            label:`Starting point: ${busData.start?.name}`,
                            body: `Departure at: ${busData.startT} Hrs\nRoute: ${busData.route}`
                          })}} 
                        />}

                        {/* Rendering path */}
                        {routeLocations.length > 1 && routeLocations.map((point, index) => {
                          if (index < routeLocations.length - 1) {
                            return <Directions key={index} point1={routeLocations[index]} point2={routeLocations[index+1]} polylineOptions={{strokeColor: '#FF0000', strokeOpacity: 0.7, strokeWeight: 5 }}/>
                          } else {
                            return null;
                          }
                        })}
                      </>
                    );
                  }
                                  
                  default:
                    break;
                }
              })()}

              {/* Rendering popup window */}
              {infoWindow?.state && <InfoWindow 
                headerContent={(<Texts fontSize='14px' fontWeight='normal'>{infoWindow.label}</Texts>)} 
                style={{minWidth:'120px', display:'flex', justifyContent:'center'}} 
                position={infoWindow?.position} 
                onClose={()=>{setInfoWindow({...infoWindow, state:false})}} 
              >
                <Typography sx={{ fontFamily:'Open Sans', fontSize:'14px', whiteSpace: 'pre-wrap' }}>{infoWindow?.body}</Typography>
              </InfoWindow>} 
            </Map>

            <IconButton 
              sx={{
                position: 'relative',
                top: '-70px',
                left: '15px',
                zIndex: 10,
                color:'#404040',
                padding: '10px',
                bgcolor:'#f2f2f2',
                border: '1px solid #ccc',
                ":hover":{
                  color:'black',
                  bgcolor:'#f2f2f2',
                }
              }}
              onClick={showMyLocation}
            >
              <MyLocationIcon/>
            </IconButton>
          </>
        }      
      </APIProvider>      
    </Box>    
  )
}
