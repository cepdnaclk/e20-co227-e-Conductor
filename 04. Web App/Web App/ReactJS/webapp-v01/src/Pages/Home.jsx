import React, { useState, useEffect } from 'react';
import './Home.css';

export default function Home({ language }) {
  const [liveData, setLiveData] = useState({
    latitude: 0,
    longitude: 0,
    altitude: 0,
    heading: 0,
    speed: 0,
    accuracy: 0
  });

  const [requestCount, setRequestCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by your browser');
      return;
    }

    const successCallback = (position) => {
      const { accuracy, latitude, longitude, altitude, heading, speed } = position.coords;
      setLiveData({ accuracy, latitude, longitude, altitude, heading, speed });
      setRequestCount(prevCount => prevCount + 1);
      setError("Success");
    };

    const errorCallback = (error) => {
      console.error('Error obtaining location', error);
      setError('Error');
    };

    const watchId = navigator.geolocation.watchPosition(successCallback, errorCallback);

    // Cleanup function to clear the watcher when the component unmounts
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div>
      <h1>HOME</h1>
      <h3>Language: {language}</h3>

      <h2>Request Count: {requestCount}</h2>

      <h4>Lat: {liveData.latitude}</h4>
      <h4>Lng: {liveData.longitude}</h4>
      <h4>Acc: {liveData.accuracy}</h4>
      <h4>Alt: {liveData.altitude}</h4>
      <h4>Spd: {liveData.speed}</h4>
      <h4>Hdg: {liveData.heading}</h4>
      {error && <h5>{error}</h5>}
    </div>
  );
}
