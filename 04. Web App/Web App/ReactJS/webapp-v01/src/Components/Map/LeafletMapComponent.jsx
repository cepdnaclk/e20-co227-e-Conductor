import React, { useEffect, useRef, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import ManIcon from '@mui/icons-material/Man';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { renderToString } from 'react-dom/server';
import useCurrentGPSLocation from '../SessionData/useCurrentGPSLocation';
import Texts from '../InputItems/Texts'

// Dummy bus stops
const busStops = [
  {
    "name": "Kurunduwatte",
    "latitude": 7.243630047731192,
    "longitude": 80.59471319873906
  },
  {
    "name": "Akbar",
    "latitude": 7.25235057321553,
    "longitude": 80.59333382765641
  },
  {
    "name": "Peradeniya",
    "latitude": 7.2631666355550575,
    "longitude": 80.59296904470439
  },
  {
    "name": "Peradeniya",
    "latitude": 7.264348737954064,
    "longitude": 80.5927983201521
  },
  {
    "name": "Galaha Junction",
    "latitude": 7.2656183598161075,
    "longitude": 80.59577370836975
  },
  {
    "name": "Botanical Garden",
    "latitude": 7.2675836946042915,
    "longitude": 80.59648176923187
  },
  {
    "name": "Hospital",
    "latitude": 7.268000173687011,
    "longitude": 80.59916263694033
  },
  {
    "name": "Rajawaththa",
    "latitude": 7.268047028533296,
    "longitude": 80.60223751719053
  },
  {
    "name": "Dangolla Junction",
    "latitude": 7.270664240431243,
    "longitude": 80.60479764429803
  },
  {
    "name": "Gatambe",
    "latitude": 7.272281404312179,
    "longitude": 80.60606340111026
  },
  {
    "name": "Kandy Hospital",
    "latitude": 7.288209595790418,
    "longitude": 80.63166044283383
  }
];

// Convert EmojiPeopleIcon to SVG string
const emojiPeopleIconSvg = renderToString(<EmojiPeopleIcon style={{ fontSize: '35px', color: 'black' }} />);
const DirectionsBusIconSvg = renderToString(<DirectionsBusIcon style={{ fontSize: '20px', color: '#0066ff' }} />);
const AirportShuttleIconSvg = renderToString(<AirportShuttleIcon style={{ fontSize: '26px', color: '#cc0000' }} />);
const ManIconSvg = renderToString(<ManIcon style={{ fontSize: '35px', color: 'black' }} />);
const LocationOnIconSvg = renderToString(<LocationOnIcon style={{ fontSize: '30px', color: '#cc0000' }} />);

// Creating marker icons
const passengerLocationMarker = new L.divIcon({
  className: 'custom-div-icon',
  html: `<div class="custom-icon">${emojiPeopleIconSvg}</div>`,
  iconSize: [32, 35],
  iconAnchor: [0, 0],
  popupAnchor: [1, -40],
});

const busStopMarker = new L.divIcon({
  className: 'custom-div-icon',
  html: `<div class="custom-icon">${DirectionsBusIconSvg}</div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [10, 0],
});

const myBussMarker = new L.divIcon({
  className: 'custom-div-icon',
  html: `<div class="custom-icon">${AirportShuttleIconSvg}</div>`,
  iconSize: [26, 23],
  iconAnchor: [13, 23],
  popupAnchor: [0, -15],
});

const userLocationMarker = new L.divIcon({
  className: 'custom-div-icon',
  html: `<div class="custom-icon">${ManIconSvg}</div>`,
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [1, -33],
});

const LocationMarker = new L.divIcon({
  className: 'custom-div-icon',
  html: `<div class="custom-icon">${LocationOnIconSvg}</div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [1, -22],
});



export default function LeafletMapComponent({page, findMe, setFindMe}) {
  // Default location - Colombo Sri Lanka
  const center = [6.927218696598834, 79.86022185737559]; 

  // Map controlls
  const zoomLevel = 16;
  const mapRef = useRef();

  // Getting current location
  const location = useCurrentGPSLocation();
  
  // Finding my current location
  useEffect(()=>{
    const showMyLocation = () => {
      if(location.loaded && !location.error){
        mapRef.current.flyTo([location.coordinates.lat, location.coordinates.lng], zoomLevel, {animate: true});
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

  return (
    <MapContainer center={center} zoom={zoomLevel} style={{ height: '100%', width: '100%' }} ref={mapRef}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* Marking busstops in the map */}
      {busStops.length > 0 ? busStops.map((busStop, idx) => (
        <Marker 
          key={idx} 
          position={[busStop.latitude, busStop.longitude]} 
          icon={busStopMarker}
        >
          <Popup> {busStop.name} </Popup>
        </Marker>
      )) : <></>}


      {/* Use logic here to adjust map according to the request */}
      {(()=>{
        switch (page) {
          case 'booking':{
            return (
              // Set user's current location
              location.loaded && !location.error && (
                <Marker position={[location.coordinates.lat, location.coordinates.lng]} icon={userLocationMarker}>
                  <Popup>Me</Popup>
                </Marker>
              )
            );
          }        
          default:
            break;
        }
      })()}

      {/* Set */}
      
    </MapContainer>
  );
}
