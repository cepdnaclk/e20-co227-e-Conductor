import { Box, Button, Divider, Grid, Paper } from "@mui/material";
import React, { useEffect } from "react";
import Texts from "../../InputItems/Texts";
import { useNavigate } from "react-router-dom";
import Stepper from "../../ProgressBars/Stepper";
import { ToastAlert } from "../../MyNotifications/WindowAlerts";
import useDateAndTime from "../../../Utils/useDateAndTime";
import { postData } from "../../../APIs/NodeBackend2";

export default function Purchasing({
  bookingData,
  activeStep,
  steps,
  handleBack,
  setBookingData,
  setLoading,
}) {
  const navigate = useNavigate();
  const { date, time } = useDateAndTime();

  // Update final infomations
  useEffect(() => {
    // Requesting personal infomation
    const fetch = async () => {
      const userId = await (JSON.parse(localStorage.getItem("userId")) ||
        JSON.parse(sessionStorage.getItem("userId")));

      const total = parseFloat(calAdultPrice()) + parseFloat(calChildPrice());

      //console.log("User personal data request for ticket: ", { userId, total });

      try {
        setLoading(true); // Enabling spinner
        const serverResponse = await postData("users/req8", { userId, total });
        //console.log(`serverResponse:: ${JSON.stringify(serverResponse.data)}`);
        const { name, mobile, email, totalPrice, discount } =
          serverResponse.data;

        setBookingData({
          ...bookingData,
          userID: userId,
          issuedDate: date,
          issuedTime: time,
          discount,
          totalPrice,
          name,
          mobile,
          email,
        });
      } catch (error) {
        console.error("Error adding user:", error);
        ToastAlert({
          type: "warning",
          title: "Your connection is unstable.\nPlease reload page again.",
        });
      } finally {
        setLoading(false); // Disabling spinner
      }
    };

    // Calculating
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ticket price calculation
  const calAdultPrice = () => {
    return (
      parseFloat(bookingData.full) *
      parseFloat(bookingData.unitPrice) *
      1
    ).toFixed(2);
  };

  const calChildPrice = () => {
    return (
      parseFloat(bookingData.half) *
      parseFloat(bookingData.unitPrice) *
      0.5
    ).toFixed(2);
  };

  // Handling purchasing event
  const handlePurchase = () => {
    console.log("Purchasing");
    requestConfirmation(bookingData);
  };

  // API to send billing infomation
  const requestConfirmation = async (data) => {
    //console.log("Confirming ticket: ", data);

    try {
      setLoading(true); // Enabling spinner
      const serverResponse = await postData("tickets/tkt3", data);
      //console.log("Ticket Payment: ", serverResponse.data);
      if (serverResponse.data === "success") {
        ToastAlert({
          type: "success",
          title: "Payment Successfull!",
        });
      } else if (serverResponse.data === "insufficient") {
        ToastAlert({
          type: "error",
          title: "Insufficient Balance!",
        });
      } else {
        console.log("payment failed!");
      }
    } catch (error) {
      console.error("Ticket Error:", error);
      ToastAlert({
        type: "error",
        title: "Payment Failed!",
      });
    } finally {
      setLoading(false); // Disabling spinner
      refresh();
    }
  };

  // Referesh page
  const refresh = () => {
    setTimeout(() => {
      navigate(0);
    }, 3001);
  };

  return (
    <Paper
      sx={{
        width: "Calc(100% - 20px)",
        height: "70vh",
        minHeight: "400px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        margin: "10px 0",
      }}
    >
      <Stepper steps={steps} activeStep={activeStep} height={"100px"} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "calc(100% - 100px)",
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
          mt={3}
        >
          <Grid container spacing={1}>
            <Grid item xs={7}>
              <Texts>Adult Tickets x {bookingData.full}</Texts>
            </Grid>
            <Grid item xs={5} textAlign="right">
              <Texts>LKR {calAdultPrice()}</Texts>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={7}>
              <Texts>Child Tickets x {bookingData.half}</Texts>
            </Grid>
            <Grid item xs={5} textAlign="right">
              <Texts>LKR {calChildPrice()}</Texts>
            </Grid>
          </Grid>

          {/* <Grid container spacing={1}>
            <Grid item xs={6}>
              <Texts>Booking Fee</Texts>
            </Grid>
            <Grid item xs={6} textAlign='right'>
              <Texts>LKR {parseFloat(bookingData.bookingFee).toFixed(2)}</Texts>
            </Grid>
          </Grid> */}

          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Texts>Discounts</Texts>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Texts>- LKR {parseFloat(bookingData.discount).toFixed(2)}</Texts>
            </Grid>
          </Grid>

          <Divider sx={{ border: "none", borderTop: "1px black solid" }} />

          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Texts variant={"h6"} fontColor="#ff9900">
                Total
              </Texts>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Texts variant={"h6"} fontColor="#ff9900">
                LKR {parseFloat(bookingData.totalPrice).toFixed(2)}
              </Texts>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            sx={{ width: "120px" }}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            variant="contained"
            sx={{ width: "120px" }}
            onClick={handlePurchase}
          >
            Purchase
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
