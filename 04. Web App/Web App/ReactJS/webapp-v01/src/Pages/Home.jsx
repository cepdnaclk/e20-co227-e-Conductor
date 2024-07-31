import React, { useState } from 'react'
import './Home.css'

export default function Home({ language }) {
  var request = 0;
  const [liveData, setLiveData] = useState({
    latitude:0,
    longitude:0,
    altitude:0,
    heading:0,
    speed:0,
    accuracy:0
  });

  navigator.geolocation.watchPosition(successCallback);

  function successCallback(position){
    const { accuracy, latitude, longitude, altitude, heading, speed } = position.coords;
    request = request + 1;
    setLiveData({accuracy, speed, altitude, longitude, latitude, heading});
  }

  /* 
  const watchID = navigator.geolocation.watchPosition(position => {
    const { latitude, longitude } = position.coords;
    console.log("watchID: " + watchID);
  });
 */
  return (
    <div >
      <h1>HOME</h1>
      <h3>Language: {language} </h3>

      <h2>Request Count: {request}</h2>
      
      <h4>Lat: {liveData.latitude}</h4>
      <h4>Lng: {liveData.longitude}</h4>
      <h4>Acc: {liveData.accuracy}</h4>
      <h4>Alt: {liveData.altitude}</h4>
      <h4>Spd: {liveData.speed}</h4>
      <h4>Hdg: {liveData.heading}</h4>

    </div>
  )
}
