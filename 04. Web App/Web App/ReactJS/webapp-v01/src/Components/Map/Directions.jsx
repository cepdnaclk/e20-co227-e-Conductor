import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

export default function Directions({ point1, point2, polylineOptions }) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [dirService, setDirService] = useState(
    /** @type google.maps.DirectionsService */ (null)
  );
  const [dirRender, setDirRender] = useState(
    /** @type google.maps.DirectionsRenderer */ (null)
  );

  useEffect(() => {
    if (!routesLibrary || !map) return;

    setDirService(new routesLibrary.DirectionsService());
    setDirRender(
      new routesLibrary.DirectionsRenderer({
        map,
        suppressMarkers: true,
        preserveViewport: true,
        polylineOptions: polylineOptions,
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!dirService || !dirRender) return;

    dirService
      .route({
        origin: point1,
        destination: point2,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: false,
        drivingOptions: { departureTime: new Date() },
      })
      .then((response) => {
        dirRender.setDirections(response);
        //console.log("routes: ", response.routes);
      });
  }, [dirService, dirRender, point1, point2]);

  return null;
}
