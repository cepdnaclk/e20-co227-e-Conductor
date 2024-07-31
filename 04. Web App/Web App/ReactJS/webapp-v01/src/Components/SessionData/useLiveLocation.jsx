import { useEffect, useState } from "react";


export default function useLiveLocation() {
  const [liveData, setLiveData] = useState({
    loaded: false,
    coordinates:{
      latitude: 0,
      longitude: 0,
      altitude: 0,
      heading: 0,
      speed: 0,
      accuracy: 0,
      reqCount:0
    }    
  }); 

  // Checking permission for geolocation
  useEffect(()=>{
    // When an error occurs
    const onError = error => {
      setLiveData(prevData => ({
        ...prevData,
        loaded: true,
        error,
      }));
    }  
  
    // When event is success
    const onSuccess = position => {
      const { accuracy, latitude, longitude, altitude, heading, speed } = position.coords;
      
      setLiveData(prev => ({
        loaded: true,
        coordinates: { latitude, longitude, accuracy, heading, speed, altitude, reqCount: prev.coordinates.reqCount + 1 },
      }));
    };

    // Options
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }

    if(!("geoLocation" in navigator)){
      onError({
        code: 0,
        message: "Geolocation is not supported",
      });
    }    

    const watchId = navigator.geolocation.watchPosition(onSuccess, onError, options);

    // Cleanup function to clear the watcher when the component unmounts
    return () => navigator.geolocation.clearWatch(watchId);
  },[]);

  return liveData;
}
