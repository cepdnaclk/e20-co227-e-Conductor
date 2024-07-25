import { useEffect, useState } from 'react'

export default function useCurrentGPSLocation() {
  const [location, setLocation] = useState({
    loaded : false,
    coordinates: { lat: '', lng: '' },
  });

  // When event is success
  const onSuccess = location => {
    setLocation({
        loaded: true,
        coordinates: {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        },
    });
  }

  // When an error occurs
  const onError = error => {
    setLocation({
        loaded: true,
        coordinates: { lat: '', lng: '' },
        error,
    });
  }

  // Checking permission for geolocation
  useEffect(()=>{
    if(!("geoLocation" in navigator)){
        onError({
            code: 0,
            message: "Geolocation is not supported",
        });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  },[])

  return location;
}
