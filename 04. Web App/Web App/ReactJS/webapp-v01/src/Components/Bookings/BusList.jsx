import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import BusFilter from "./Forms/BusFilter";
import Buslist from "./MapArea/BusList";
import { postData } from "../../APIs/NodeBackend2";
import { ToastAlert } from "../MyNotifications/WindowAlerts";

export default function BusList({
  activeStep,
  setActiveStep,
  setPrevStep,
  bookingData,
  setBookingData,
  steps,
  setLoading,
  setSeats,
}) {
  // Variable to store original schedule data
  const [buses, setBuses] = useState([]);

  // Variable to store service type filter
  const [serviceFilter, setServiceFilter] = useState([]);

  // Variable to store Route type filter
  const [routeFilter, setRouteFilter] = useState([]);

  // Variable to store organization category filter
  const [orgFilter, setOrgFilter] = useState([]);

  // Fetch schedule information from node backend
  useEffect(() => {
    const fetch = async (data) => {
      //console.log("Requesting bus schedules: ", data);

      try {
        setLoading(true); // Enabling spinner
        const serverResponse = await postData("schedule/sdl1", data);
        console.log("Available Buses:: ", serverResponse.data);
        setBuses(serverResponse.data);
      } catch (error) {
        console.error("Error fetching schedule:", error);
        ToastAlert({
          type: "warning",
          title: "Your connection is unstable.\nPlease reload page again.",
        });
      } finally {
        setLoading(false); // Disabling spinner
      }
    };

    fetch({
      from: bookingData.from.id,
      to: bookingData.to.id,
      date: bookingData.date,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingData]);

  // Handling Back Button
  const handleBack = () => {
    //console.log('Goto visual step 1');
    setPrevStep(activeStep);
    setActiveStep(activeStep - 1);
  };

  // Handle Continue Button
  const handleNext = (e) => {
    //console.log("Schedule ID: ", e.target.id);
    //console.log("Busses: ", buses);
    //console.log("TypeOf(item): "+ typeof(buses[0].id) + "TYpeOf(e)"+ typeof(e.target.id));
    const bus = buses.filter(
      (item) => parseInt(item.id) === parseInt(e.target.id)
    )[0];
    sessionStorage.setItem("bus", JSON.stringify(bus));
    //console.log("Selected Bus: ", bus);

    // Update booking data
    setBookingData({
      ...bookingData,
      scheduleId: bus?.id,
      aproxDepT: bus?.departure,
      aproxAriT: bus?.arrival,
      unitPrice: bus?.price,
      journey: bus?.journey,
    });

    // Update seat infomation
    setSeats({ seats: bus?.seats, booked: bus?.booked });

    // Goto next step
    //console.log('Goto visual step 3');
    setPrevStep(activeStep);
    setActiveStep(activeStep + 1);
  };

  // Filtering function
  function filterByPreferance() {
    let filteredList = buses;

    // Step 1 : Filter by service type
    if (serviceFilter.length > 0) {
      filteredList = filteredList.filter((item) =>
        serviceFilter.includes(item.service.toLowerCase())
      );
    }

    // Step 2 : Filter by route type
    if (routeFilter.length > 0) {
      filteredList = filteredList.filter((item) =>
        routeFilter.includes(item.routeType.toLowerCase())
      );
    }

    // Step 2 : Filter by route type
    if (orgFilter.length > 0) {
      filteredList = filteredList.filter((item) =>
        orgFilter.includes(item.org.toLowerCase())
      );
    }

    //console.log(`Filtered List:: ${JSON.stringify(filteredList)}`);
    return filteredList;
  }

  return (
    <Box
      sx={{
        bgcolor: "ghostwhite",
        width: "100%",
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
      }}
    >
      <Grid
        container
        sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      >
        <Grid
          item
          xs={12}
          md={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <BusFilter
            activeStep={activeStep}
            steps={steps}
            handleBack={handleBack}
            setServiceFilter={setServiceFilter}
            setRouteFilter={setRouteFilter}
            setOrgFilter={setOrgFilter}
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={8}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Buslist buses={filterByPreferance()} handleClick={handleNext} />
        </Grid>
      </Grid>
    </Box>
  );
}
