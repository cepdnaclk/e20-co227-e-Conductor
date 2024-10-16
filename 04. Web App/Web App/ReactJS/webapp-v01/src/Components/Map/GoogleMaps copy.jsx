import { Box, IconButton, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { APIProvider, InfoWindow, Map } from "@vis.gl/react-google-maps";
import {
  BusMarker,
  BusStopMarker,
  FromMarker,
  LocationMarker,
  PersonMarker,
  StartMarker,
  ToMarker,
} from "./AdvancedMarkers";
import Texts from "../InputItems/Texts";
import useLiveLocation from "../SessionData/useLiveLocation";
import Directions from "./Directions";
import regions from "../../Utils/regions.json";
import { getData } from "../../APIs/NodeBackend2";
import { ToastAlert } from "../MyNotifications/WindowAlerts";

// Default center location - Colombo Sri Lanka
const center = { lat: 6.927218696598834, lng: 79.86022185737559 };

/* // Sri Lanka Border
const border = {
  north: 9.908972567284216,
  south: 5.927144834513064,
  east: 81.8873002690906,
  west: 79.6900346440906,
};

*/
// Unwanted POIs - Bus Stops
/* const mapStyles = [{
  featureType: "transit.station.bus",
  stylers: [{ visibility: "off" }],
}]; */

function findingVisibleAreas({ north, south, east, west }) {
  const visibleAreas = [];
  //console.log(`Camera:: \nNorth: ${north}\nSouth: ${south}\nEast: ${east}\nWest: ${west}`);

  regions.forEach((region) => {
    if (
      region.margins.south < north && // region's southern boundary is above the northern boundary
      region.margins.west < east && // region's western boundary is left of the eastern boundary
      region.margins.east > west && // region's eastern boundary is right of the western boundary
      region.margins.north > south // region's northern boundary is below the southern boundary
    ) {
      visibleAreas.push(region.areaId);
    }
  });

  return visibleAreas;
}

export default function GoogleMaps({
  page,
  from,
  to,
  busData,
  routeLocations,
  estmData,
  busLocation,
  myBusesLocation,
  generalData,
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Getting device current location
  const location = useLiveLocation();

  // Variable to hold Target location
  const [target, setTarget] = useState({ active: false, coordinates: center });

  // Variable to track window
  const [infoWindow, setInfoWindow] = useState({
    state: false, // window is closed
    label: "",
    body: "",
    position: center,
  });

  // Goto my target location
  const showMyLocation = () => {
    if (location.loaded && !location.error) {
      setTarget({ active: true, coordinates: location.coordinates });
    } else {
      alert(location.error.message);
    }
  };

  // Variable to hold bus stops
  const [busStops, setBusStops] = useState(
    JSON.parse(sessionStorage.getItem("busStopLocations")) || []
  );

  // variable to store map border
  const [camera, setCamera] = useState({});

  // Variable to hold current zoom level
  const [zoom, setZoom] = useState(13);

  // Variable to hold the saved area numbers during the map is open
  const [savedAreas, setSavedAreas] = useState(
    JSON.parse(sessionStorage.getItem("areas")) || []
  );

  // API Call Function
  const fetch = async (areas) => {
    try {
      const sessionData = await getData("busstops/locations", areas);
      //console.log(`BusStops:: ${JSON.stringify(sessionData.data)}`);
      const points = sessionData.data;
      if (points.length > 0) {
        Store(points, areas);
      } else {
        console.log("No data");
      }
    } catch (error) {
      console.log(`error in fetching bus stops`);
      ToastAlert({
        type: "warning",
        title: "Your connection is unstable.\nPlease reload page again.",
      });
    }
  };

  // Storing algorithm
  const Store = (points, area) => {
    let storedData = busStops;
    let storedAreas = savedAreas;
    //console.log("StoredData:: ", storedData);
    //console.log("SavedAreas:: ", storedAreas);

    storedData = [...storedData, ...points];
    storedAreas = [...storedAreas, ...area];
    //console.log("updated list: ", storedData);
    //console.log("updated areas: ", storedAreas);

    sessionStorage.setItem("busStopLocations", JSON.stringify(storedData));
    sessionStorage.setItem("areas", JSON.stringify(storedAreas));
    setBusStops(storedData);
    setSavedAreas(storedAreas);
  };

  // Finding the newly added areas
  useEffect(() => {
    if (zoom > 13) {
      // Finding visible areas
      const visibleAreas = findingVisibleAreas(camera);
      //console.log("Visible areas: ", visibleAreas);

      const newAreas = visibleAreas.filter(
        (area) => !savedAreas.includes(area)
      );
      //console.log("New areas: ", newAreas);

      if (newAreas.length > 0) {
        fetch(newAreas);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camera, zoom]);

  // Show targets
  useEffect(() => {
    if (!!from) {
      setTarget({ active: true, coordinates: from.location });
    }
  }, [from]);

  useEffect(() => {
    if (!!to) {
      setTarget({ active: true, coordinates: to.location });
    }
  }, [to]);

  // Window timeout
  useEffect(() => {
    if (infoWindow.state === true) {
      setTimeout(() => {
        setInfoWindow({ ...infoWindow, state: false });
      }, 3000);
    }
  }, [infoWindow]);

  // Function to find the bus informations
  const busInfo = (regNo) => {
    if (generalData.length > 0) {
      const details = generalData.filter((bus) => bus.regNo === regNo);
      console.log("Filterd bus details: ", JSON.stringify(details[0]));
      return `${details[0].route}\n${details[0].routeType}\nDriver: ${details[0].driver}\nConductor: ${details[0].conductor}`;
    }
    return null;
  };

  // Function to split bus stop name
  const splitedName = (routes, name) => {
    const nameParts = name.split(",");
    return `${routes}\n${nameParts[1].trim()}\n${nameParts[2].trim()}`;
  };

  return (
    <Box width="100%" height="100%">
      <APIProvider
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        onLoad={() => setIsLoaded(true)}
      >
        {!isLoaded ? (
          <Skeleton />
        ) : (
          <>
            <Map
              mapId="DEMO-MAP-ID"
              defaultZoom={zoom}
              defaultCenter={page === "busTracking" ? busLocation : center}
              center={target.active ? target.coordinates : null}
              zoom={target.active ? 16 : null}
              onCenterChanged={() => {
                /* console.log("center changed");
                console.log("Target: ", target); */
                setTarget({ ...target, active: false });
              }}
              fullscreenControl={false}
              streetViewControl={false}
              mapTypeControl={false}
              minZoom={8}
              maxZoom={20}
              reuseMap
              onCameraChanged={(e) => {
                setCamera(e.detail.bounds);
                setZoom(e.detail.zoom);
              }}
              //styles={mapStyles}
            >
              {/* MAP COMPONENETS */}
              {/* Rendering Bus Stops */}
              {zoom > 14 &&
                busStops.length > 0 &&
                busStops.map((place) => (
                  <BusStopMarker
                    key={place.id}
                    title={place.name.split(",")[0]}
                    position={place.location}
                    onClick={() => {
                      setInfoWindow({
                        state: true,
                        position: place.location,
                        label: place.name,
                        body: splitedName(place.routes, place.name),
                      });
                    }}
                  />
                ))}

              {/* Rendering user's live location */}
              {location.loaded && !location.error && (
                <PersonMarker
                  title={"Me"}
                  position={location?.coordinates}
                  onClick={() => {
                    setInfoWindow({
                      state: true,
                      position: location?.coordinates,
                      label: "My Location",
                    });
                  }}
                />
              )}

              {(() => {
                switch (page) {
                  case "booking": {
                    return (
                      <>
                        {/* Rendering FROM - TO location */}
                        {!!from && (
                          <FromMarker
                            title={from?.name}
                            position={from?.location}
                            onClick={() => {
                              setInfoWindow({
                                state: true,
                                position: from?.location,
                                label: from?.name,
                              });
                            }}
                          />
                        )}
                        {!!to && (
                          <ToMarker
                            title={to?.name}
                            position={to?.location}
                            onClick={() => {
                              setInfoWindow({
                                state: true,
                                position: to?.location,
                                label: to?.name,
                              });
                            }}
                          />
                        )}
                      </>
                    );
                  }

                  case "busTracking": {
                    return (
                      <>
                        {/* Rendering bus live location */}
                        {!!busLocation && (
                          <BusMarker
                            title={busData.regNo}
                            position={busLocation}
                            onClick={() => {
                              setInfoWindow({
                                state: true,
                                position: busLocation,
                                label: busData?.regNo,
                                body: `${busData.route}\n${busData.org}\n${busData.service}\n${busData.routeType}`,
                              });
                            }}
                          />
                        )}

                        {/* Rendering FROM, TO, and START locations */}
                        {!!busData?.from && (
                          <FromMarker
                            title={busData.from?.name}
                            position={busData.from?.location}
                            onClick={() => {
                              setInfoWindow({
                                state: true,
                                position: busData.from?.location,
                                label: `Origin: ${busData.from?.name}`,
                                body: `Arrived at: ${estmData.fromArT} Hrs\nRoute: ${busData.route}`,
                              });
                            }}
                          />
                        )}
                        {!!busData?.to && (
                          <ToMarker
                            title={busData.to?.name}
                            position={busData.to?.location}
                            onClick={() => {
                              setInfoWindow({
                                state: true,
                                position: busData.to?.location,
                                label: `Destination: ${busData.to?.name}`,
                                body: `Arrived at: ${estmData.toArT} Hrs\nRoute: ${busData.route}`,
                              });
                            }}
                          />
                        )}
                        {!!busData?.start && (
                          <StartMarker
                            title={busData.start?.name}
                            position={busData.start?.location}
                            onClick={() => {
                              setInfoWindow({
                                state: true,
                                position: busData.start?.location,
                                label: `Starting point: ${busData.start?.name}`,
                                body: `Departure at: ${busData.startT} Hrs\nRoute: ${busData.route}`,
                              });
                            }}
                          />
                        )}

                        {/* Rendering path */}
                        {routeLocations.length > 1 &&
                          routeLocations.map((point, index) => {
                            if (index < routeLocations.length - 1) {
                              return (
                                <Directions
                                  key={index}
                                  point1={routeLocations[index]}
                                  point2={routeLocations[index + 1]}
                                  polylineOptions={{
                                    strokeColor: "#FF0000",
                                    strokeOpacity: 0.7,
                                    strokeWeight: 5,
                                  }}
                                />
                              );
                            } else {
                              return null;
                            }
                          })}
                      </>
                    );
                  }

                  case "myBuses": {
                    return (
                      <>
                        {/* Rendering the buses location */}
                        {myBusesLocation.loaded &&
                          myBusesLocation.data.map((bus) => (
                            <LocationMarker
                              key={bus.regNo}
                              title={bus.regNo}
                              position={bus.location}
                              onClick={() => {
                                setInfoWindow({
                                  state: true,
                                  position: bus.location,
                                  label: bus.regNo,
                                  body: busInfo(bus.regNo),
                                });
                              }}
                            />
                          ))}
                      </>
                    );
                  }

                  default:
                    break;
                }
              })()}

              {/* Rendering popup window */}
              {infoWindow?.state && (
                <InfoWindow
                  headerContent={
                    <Texts fontSize="14px">{infoWindow.label}</Texts>
                  }
                  style={{
                    minWidth: "120px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  position={infoWindow?.position}
                  pixelOffset={[0, -30]}
                  onClose={() => {
                    setInfoWindow({ ...infoWindow, state: false });
                  }}
                >
                  <Texts whiteSpace="pre-wrap" fontWeight="normal">
                    {infoWindow?.body}
                  </Texts>
                </InfoWindow>
              )}
            </Map>

            <IconButton
              sx={{
                position: "relative",
                top: "-70px",
                left: "15px",
                zIndex: 10,
                color: "#404040",
                padding: "10px",
                bgcolor: "#f2f2f2",
                border: "1px solid #ccc",
                ":hover": {
                  color: "black",
                  bgcolor: "#f2f2f2",
                },
              }}
              onClick={showMyLocation}
            >
              <MyLocationIcon />
            </IconButton>
          </>
        )}
      </APIProvider>
    </Box>
  );
}
