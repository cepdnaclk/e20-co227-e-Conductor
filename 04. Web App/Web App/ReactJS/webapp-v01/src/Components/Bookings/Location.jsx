import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import LocationForm from "./Forms/LocationForm";
import Map from "./MapArea/Map";
import { ToastAlert } from "../MyNotifications/WindowAlerts";
import { OnceFlyInX, OnceZoomIn } from "../Animations/Entrance.Once";
import ConditionalAnimation from "../Animations/Entrance.Conditional";

export default function Location({
  activeStep,
  setActiveStep,
  prevStep,
  setPrevStep,
  bookingData,
  setBookingData,
  steps,
  setLoading,
}) {
  // Variables to store from location
  const [from, setFrom] = useState({});
  const [to, setTo] = useState({});

  // Variable to store booked date
  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState(false);

  // Variable to set date Error
  const minDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // today + 24hrs

  // Validating date
  useEffect(() => {
    const bookedDay = new Date(date);
    //console.log(`minDate: ${minDate}   booking: ${bookedDay}`);
    if (minDate > bookedDay) {
      setDateError(true);
    } else {
      setDateError(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  // Handling continue button
  const handleClick = () => {
    //console.log(`from: ${JSON.stringify(from)}  to: ${JSON.stringify(to)}   date err: ${JSON.stringify(dateError)}  date:${JSON.stringify(date)}`)
    if (!!from && !!from.id && !!to && !!to.id && !dateError && !!date) {
      // Update booking data
      setBookingData({ ...bookingData, from: from, to: to, date: date });

      // Goto next step
      // console.log('Goto visual step 2');
      setPrevStep(0);
      setActiveStep(activeStep + 1);
    } else {
      ToastAlert({
        type: "error",
        title: "Some fields might be invalid!",
      });
    }
  };

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
        <Grid item xs={12} md={4}>
          <ConditionalAnimation
            condition1={activeStep === prevStep}
            Animation1={OnceZoomIn}
            condition2={activeStep < prevStep}
            Animation2={OnceFlyInX}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LocationForm
              steps={steps}
              activeStep={activeStep}
              date={date}
              setDate={setDate}
              dateError={dateError}
              setFrom={setFrom}
              setTo={setTo}
              setLoading={setLoading}
              handleClick={handleClick}
            />
          </ConditionalAnimation>
        </Grid>

        <Grid item xs={12} md={8}>
          <ConditionalAnimation
            condition1={activeStep === prevStep}
            Animation1={OnceZoomIn}
            condition2={activeStep < prevStep}
            Animation2={OnceFlyInX}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Map from={from} to={to} setLoading={setLoading} />
          </ConditionalAnimation>
        </Grid>
      </Grid>
    </Box>
  );
}
