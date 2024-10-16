import { Box, Card, Grid } from "@mui/material";
import Texts from "../Components/InputItems/Texts";
import React, { useEffect, useState } from "react";
import GoogleMaps from "../Components/Map/GoogleMaps";
import { Navigate, useNavigate } from "react-router-dom";
import { OnceFlyInX, OnceZoomIn } from "../Components/Animations/Entrance.Once";
import { getData } from "../APIs/NodeBackend2";
import { ToastAlert } from "../Components/MyNotifications/WindowAlerts";
import getDistanceAndDuration from "../Components/Map/getDistanceAndDuration";

// Time step size
const TIME_STEP = 5000; // im ms
const TOLARANCE = 100; // in meters

function convertDistance(distance) {
  let d;

  if (distance < 0) {
    d = "N/A";
  } else if (distance < 1000) {
    d = `${distance.toFixed(2)} m`;
  } else {
    d = `${(distance * 0.001).toFixed(2)} km`;
  }
  return d;
}

export default function Tracking({ setLoading, language }) {
  const navigate = useNavigate();

  // Get ticket ID and userID
  const userID =
    JSON.parse(localStorage.getItem("userId")) ||
    JSON.stringify(sessionStorage.getItem("userId"));
  const ticketID = JSON.parse(sessionStorage.getItem("TicketID"));

  // Variable to hold the destination point
  const [trackingState, setTrackingState] = useState(); // (pre, post)
  const [tracking, setTracking] = useState(true);

  // Variable to hold tracking availability
  const [status, setStatus] = useState({
    loading: userID && ticketID ? true : false,
    available: false,
  });

  // Variable to hold the bus info
  const [busInfo, setBusInfo] = useState({});

  // Variable to hold bus Live location
  const [liveLocation, setLiveLocation] = useState({});

  // Variable to hold the estimated data
  const [estmData, setEstmData] = useState({
    distanceA: 0,
    distanceB: 0,
    distance: 0,
    durationA: "0",
    durationB: "0",
  });

  // Fetching busInfo and route points from the backend
  useEffect(() => {
    const fetch = async () => {
      // Creating data object
      const data = {
        ticketNo: ticketID,
        userID: userID,
      };

      try {
        setLoading(true); // Enabling spinner
        const serverResponse = await getData("tickets/tkt6", data);
        const { availability, busInfo } = serverResponse.data;
        //console.log("Tracking Info", serverResponse.data);
        setStatus({
          loading: false,
          available: availability,
        });

        if (availability) {
          setBusInfo(busInfo);
        }
      } catch (error) {
        console.log(`Error in fetching tracking data!`);
        ToastAlert({
          type: "error",
          title: "Failed to load the ticket!",
          onClose: setTimeout(() => {
            navigate("/avtickets");
          }, 3001),
        });
      } finally {
        setLoading(false); // Disabling spinner
      }
    };

    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetching bus live location and estimations
  useEffect(() => {
    if ((!status.loading && !status.available) || !tracking) return;

    let isMounted = true; // To handle cleanup

    const fetchLocation = async () => {
      const data = busInfo.regNo;

      //console.log(`Bus Number: ${data}`);

      try {
        const serverResponse = await getData("tracking/bus", data);
        //console.log("Prev Location:", liveLocation);
        if (isMounted) {
          //console.log(`Live location: ${JSON.stringify(serverResponse.data)}`);
          const location = serverResponse.data;

          // Set Live Location
          setLiveLocation(location);

          // Estimations
          //console.log("origin:", location);
          //console.log("pointA:", busInfo?.from?.location);
          //console.log("pointB:", busInfo?.to?.location);

          const result = await getDistanceAndDuration(
            location,
            busInfo?.from?.location,
            busInfo?.to?.location
          );
          if (Object.keys(result).length === 5) {
            setEstmData(result);
          }
        }
      } catch (error) {
        console.error("Error in getting bus live location!", error);
      }
    };

    const intervalId = setInterval(() => {
      if (tracking) {
        fetchLocation();
      } else {
        clearInterval(intervalId);
        console.log("Stopping location tracking!");
      }
    }, TIME_STEP);

    return () => {
      isMounted = false;
      clearInterval(intervalId); // Clean up interval on component unmount
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status.available, tracking]);

  // Update tracking state
  useEffect(() => {
    //console.log("estmData:", estmData);

    const { distanceA, distanceB, distance } = estmData;

    const trackingAccess =
      distanceB - distanceA > distance - TOLARANCE ? "pre" : "post";
    const invAccess = distanceA - distanceB > distance + TOLARANCE;

    //console.log("Tracking Access: ", trackingAccess);
    //console.log("Page Access: ", invAccess);

    setTrackingState(trackingAccess);
    setTracking(!invAccess);
    if (tracking && invAccess) {
      //console.log("Tracking Ends.");
      navigate("/avtickets");
      // Add some feedback method when ride is completed
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estmData]);

  return (
    !status?.loading &&
    (status?.available ? (
      <Box
        width={"100%"}
        height={"fit-content"}
        bgcolor={"ghostwhite"}
        padding={"20px"}
      >
        <OnceFlyInX sx={{ width: "100%" }}>
          <Card
            sx={{
              width: "calc(100%)",
              padding: "8px 20px",
              mb: "20px",
              borderRadius: "10px",
              bgcolor: "#1976d2",
            }}
          >
            <Grid container spacing={2}>
              <Grid textAlign={"center"} item xs={12} lg={6}>
                <Texts fontColor="white" variant={"h5"}>
                  {busInfo.route}
                </Texts>
                <Texts fontColor="white" whiteSpace="normal">
                  {busInfo.regNo} | {busInfo.org} | {busInfo.service}
                </Texts>
              </Grid>

              <Grid textAlign={"center"} item xs={12} sm={6} lg={3}>
                <Texts fontColor="white" variant={"h5"}>
                  {trackingState === "pre"
                    ? convertDistance(estmData?.distanceA || 0)
                    : convertDistance(estmData?.distanceB || 0)}
                </Texts>
                <Texts fontColor="white">Remaining Distance</Texts>
              </Grid>

              <Grid textAlign={"center"} item xs={12} sm={6} lg={3}>
                <Texts fontColor="white" variant={"h5"}>
                  {trackingState === "pre"
                    ? estmData?.durationA
                    : estmData?.durationB}
                </Texts>
                <Texts fontColor="white">
                  Estimated Arrival Time
                  {trackingState === "pre" ? " (Origin)" : " (Destination)"}
                </Texts>
              </Grid>
            </Grid>
          </Card>
        </OnceFlyInX>

        <OnceZoomIn delay={100}>
          <Card
            sx={{
              width: "100%",
              height: "calc(100vh - 240px)",
              mb: "20px",
              borderRadius: "10px",
            }}
          >
            {Object.keys(liveLocation).length > 0 && (
              <GoogleMaps
                page={"busTracking"}
                busData={busInfo}
                busLocation={liveLocation}
                estmData={estmData}
                trackingState={trackingState}
              />
            )}
          </Card>
        </OnceZoomIn>
      </Box>
    ) : (
      <Box
        width={"100%"}
        height={"calc(100vh - 500px)"}
        bgcolor={"ghostwhite"}
        padding={"20px"}
      >
        <Navigate to={"/avtickets"} />
      </Box>
    ))
  );
}
