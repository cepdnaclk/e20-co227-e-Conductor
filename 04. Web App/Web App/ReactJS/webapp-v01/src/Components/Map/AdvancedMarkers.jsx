import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps'
import React from 'react'
import Man2Icon from '@mui/icons-material/Man2';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import Texts from '../InputItems/Texts';


export function LocationMarker({position, onClick}) {
  return (
    <AdvancedMarker position={position} onClick={onClick}>
      <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
    </AdvancedMarker>
  )
}

export function FromMarker({position, onClick, title}) {
  return (
    <AdvancedMarker position={position} onClick={onClick} title={`Origin: ${title}`} >
      <Pin scale={1.3} >
        <Texts fontColor='white'>A</Texts>
      </Pin>
    </AdvancedMarker>
  )
}

export function ToMarker({position, onClick, title}) {
  return (
    <AdvancedMarker position={position} onClick={onClick} title={`Destination: ${title}`} >
      <Pin scale={1.3} >
        <Texts fontColor='white'>B</Texts>
      </Pin>
    </AdvancedMarker>
  )
}

export function PersonMarker({position, onClick, title}) {
    return (
      <AdvancedMarker title={title} position={position} onClick={onClick}>
        <Man2Icon sx={{fontSize:'40px', width:'40px', height:'40px'}} />
      </AdvancedMarker>
    )
}

export function BusStopMarker({ position, onClick, title }) {
  return (
      <AdvancedMarker position={position} onClick={onClick} title={title}>
        <Pin background={'#0066ff'} borderColor={'white'} scale={1.1} >
          <DirectionsBusIcon sx={{fontSize:'18px', color:'white'}}/>
        </Pin>
      </AdvancedMarker>
  )
}