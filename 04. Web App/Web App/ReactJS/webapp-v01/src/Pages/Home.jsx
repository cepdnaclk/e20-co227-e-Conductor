import React from 'react';
import './Home.css';
import useLiveLocation from '../Components/SessionData/useLiveLocation'

export default function Home({ language }) {
  const liveData = useLiveLocation();

  return (
    <div>
      <h1>HOME</h1>
      <h3>Language: {language}</h3>

      {/* <h2>Request Count: {requestCount}</h2> */}

      <h4>Count: {liveData.coordinates.reqCount}</h4>
      <h4>Lat: {liveData.coordinates.latitude}</h4>
      <h4>Lng: {liveData.coordinates.longitude}</h4>
      <h4>Acc: {liveData.coordinates.accuracy}</h4>
      <h4>Alt: {liveData.coordinates.altitude}</h4>
      <h4>Spd: {liveData.coordinates.speed * 3.6} km/h</h4>
      <h4>Hdg: {liveData.coordinates.heading}</h4>
    </div>
  );
}
