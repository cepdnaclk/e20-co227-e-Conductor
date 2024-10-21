import { Box, Card, IconButton, Paper, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import GoogleMaps from "../Map/GoogleMaps";
import ChipSelect from "../InputItems/ChipSelect";
import { OnceZoomIn } from "../Animations/Entrance.Once";
import { getData } from "../../APIs/NodeBackend2";
import useDateAndTime from "../../Utils/useDateAndTime";
import NearMeIcon from "@mui/icons-material/NearMe";
import { ToastAlert } from "../MyNotifications/WindowAlerts";

// Time step for fetching locations
const TIME_STEP = 3000;

export default function BusTracking({ language, setLoading }) {
  // Current date and time
  const { date, time } = useDateAndTime();

  // Variable to hold the bus numbers
  const myBuses = JSON.parse(sessionStorage.getItem("MyBuses"));
  const busNumbers = myBuses?.map((bus) => bus.regNo);

  // Variable to hold the temparary selected bus list
  const [tempList, setTempList] = useState(
    (JSON.parse(sessionStorage.getItem("TrackingList")) || [])
      .map((busId) => {
        const foundBus = myBuses.find((myBus) => myBus.id === busId);
        return foundBus ? foundBus.regNo : null;
      })
      .filter((regNo) => regNo !== null) // Filter out null values
  );

  // Variable to hold the confirmed bus list
  const [busList, setBusList] = useState([]);

  // Variable to hold the bus's general details
  const [busDetails, setBusDetails] = useState([]);

  // Variable to hold the bus location data
  const [busLocations, setBusLocations] = useState({
    loaded: false,
    data: {},
  });

  // Handle search button
  const handleClick = () => {
    if (tempList.length > 0) {
      //console.log("Ready to start tracking");
      const list = myBuses
        .filter((bus) => tempList.includes(bus.regNo))
        .map((bus) => bus.id);
      //console.log("ID List: ", list);
      //console.log("RegNo List: ", tempList);
      GetBuses(list);
      setBusList(tempList);
    }
  };

  // Fetching user's bus numbers and details
  const GetBuses = async (buses) => {
    try {
      setLoading(true); // Enabling spinner
      const serverResponse = await getData("bus/mybuses", {
        buses,
        date,
        time,
      });
      //console.log("My Buses: ", serverResponse.data);
      setBusDetails(serverResponse.data);
    } catch (error) {
      console.log(`Error in fetching my buses.`);
      ToastAlert({
        type: "warning",
        title: "Something went wrong! Please try again!",
      });
    } finally {
      setLoading(false); // Disabling spinner
    }
  };

  // Fetching bus live location
  useEffect(() => {
    if (busList.length === 0) return;

    let isMounted = true; // To handle cleanup

    const fetchLocation = async () => {
      try {
        const serverResponse = await getData("tracking/mybuses", busList);
        if (isMounted) {
          //console.log(`Live location: ${JSON.stringify(serverResponse.data)}`);
          setBusLocations({ loaded: true, data: serverResponse.data });
        }
      } catch (error) {
        console.error("Error in getting bus live location!", error);
      }
    };

    const intervalId = setInterval(fetchLocation, TIME_STEP);

    return () => {
      isMounted = false;
      clearInterval(intervalId); // Clean up interval on component unmount
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busList]);

  return (
    <OnceZoomIn>
      <Box
        width={"100%"}
        height={"calc(100vh - 100px)"}
        bgcolor={"ghostwhite"}
        display={"flex"}
        justifyContent={"space-around"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        <Box width={"calc(100% - 40px)"} height={"calc(100% - 40px)"}>
          <Card
            sx={{
              width: "fit-content",
              height: "fit-content",
              padding: "5px",
              zIndex: 5,
              opacity: "90%",
              position: "relative",
              top: { xs: 3, sm: 10 },
              left: { xs: 3, sm: 10 },
              display: "flex",
              justifyContent: { xs: "space-around", sm: "start" },
              alignItems: "center",
            }}
          >
            <ChipSelect
              names={busNumbers}
              setValues={setTempList}
              values={tempList}
            />
            <Tooltip title={"Start Tracking"}>
              <IconButton onClick={handleClick}>
                <NearMeIcon />
              </IconButton>
            </Tooltip>
          </Card>

          <Paper
            sx={{
              width: "100%",
              height: "100%",
              boxShadow: 1,
              position: "relative",
              top: -82,
              left: 0,
            }}
          >
            <GoogleMaps
              page={"myBuses"}
              myBusesLocation={busLocations}
              generalData={busDetails}
            />
          </Paper>
        </Box>
      </Box>
    </OnceZoomIn>
  );
}
