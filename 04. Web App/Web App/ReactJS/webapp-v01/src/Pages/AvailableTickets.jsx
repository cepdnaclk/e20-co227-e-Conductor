import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import TicketCard from "../Components/Card/TicketCard";
import Texts from "../Components/InputItems/Texts";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Request } from "../APIs/NodeBackend";
import { handleNotifications } from "../Components/MyNotifications/FloatingNotifications";
import HighlightOffTwoToneIcon from "@mui/icons-material/HighlightOffTwoTone";
import { ToastAlert } from "../Components/MyNotifications/WindowAlerts";
import { Link, useNavigate } from "react-router-dom";
import { OnceFadeIn } from "../Components/Animations/Entrance.Once";
import { ViewFlyInY } from "../Components/Animations/Entrance.View";

function ConfirmBox({ data, open, handleClose, handleAgree }) {
  const descriptionElementRef = useRef(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          id="scroll-dialog-title"
          whiteSpace={"noWrap"}
          fontFamily="Open Sans"
          fontWeight="bold"
          variant="h5"
        >
          Refund Request From
        </DialogTitle>

        <DialogContent
          dividers={true}
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          <Grid container spacing={2}>
            <Grid item>
              <Texts variant="h6">Billing Information</Texts>
              <Texts>Reference No: {data.refNo}</Texts>
              <Texts>
                Date of Purchase: {data.billingDate} at {data.billingTime}
              </Texts>
              <Texts>Billing Amount: LKR {data.amount}</Texts>
            </Grid>
            <Grid item>
              <Texts variant="h6">Refund Information</Texts>
              <Texts>
                Refund Request Date: {data.cancelDate} at {data.cancelTime}
              </Texts>
              <Texts>You have request the rerfund after {data.duration}.</Texts>
              <Texts>Refund Amount: LKR {data.refund}</Texts>
            </Grid>
            <Grid item>
              <Texts
                fontColor="secondarytext"
                fontWeight="normal"
                fontStyle="italic"
                whiteSpace="normal"
              >
                Note: The refund amount is calculated based on our{" "}
                <Link to={"/terms"} sx={{ cursor: "pointer" }}>
                  refund policy
                </Link>{" "}
                , which may include cancellation fees or deductions.
              </Texts>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Back</Button>
          <Button onClick={handleAgree}>Agree & Continue</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default function AvailableTickets({ language, setLoading }) {
  const userId =
    JSON.parse(localStorage.getItem("userId")) ||
    JSON.parse(sessionStorage.getItem("userId"));
  const navigate = useNavigate();

  // Variable to hold ticket infomations
  const [tickets, setTickets] = useState([]);

  // Variable to hold dialog box's state
  const [open, setOpen] = useState(false);

  // Variable to hold refund details
  const [formData, setFormData] = useState({});

  // API call to request available ticket infomation
  useEffect(() => {
    const fetch = async (userId) => {
      const data = {
        type: "Tkt4", // Requesting available ticket infomation
        data: userId,
      };

      try {
        setLoading(true); // Enabling spinner
        const serverResponse = await Request(data, "tickets");
        //console.log('Server Response: ', JSON.stringify(serverResponse.data));
        setTickets(serverResponse.data);
      } catch (error) {
        console.log(`error in fetching available tickets`, error);
        handleNotifications({
          type: "warning",
          title: "Network Issue!",
          body: "Try Again!",
        });
      } finally {
        setLoading(false); // Disabling spinner
      }
    };

    fetch(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Open dialog box
  useEffect(() => {
    //console.log(`length of form data: ${Object.keys(formData).length}`)
    try {
      if (Object.keys(formData).length > 0) {
        setOpen(true);
      }
    } catch (error) {
      handleNotifications({
        type: "Error",
        title: "Something went wrong!",
        body: "Try Again!",
      });
    }
  }, [formData]);

  // API call for Requesting refund details
  const requestRefund = async (values) => {
    const data = {
      type: "Tkt5",
      data: values,
    };

    //console.log(`New Request: type: ${data.type}  data:${JSON.stringify(data.data)}`);

    try {
      setLoading(true); // Enabling spinner
      const serverResponse = await Request(data, "tickets");
      console.log(`Server Response: ${JSON.stringify(serverResponse.data)}`);
      setFormData(serverResponse.data);
    } catch (error) {
      console.log(`error in fetching refund infomation`, error);
      handleNotifications({
        type: "warning",
        title: "Network Issue!",
        body: "Try Again!",
      });
    } finally {
      setLoading(false); // Disabling spinner
    }
  };

  // Handling cancel button
  const handleCancel = (refNo) => {
    const date = new Date();
    //console.log(`Cancel button is clicked ${refNo} on ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`);
    requestRefund({
      cancelDate: `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`,
      cancelTime: `${date.getHours()}:${date.getMinutes()}`,
      refNo: refNo,
      userId: userId,
    });
  };

  // API call to Confirm refund request
  const confirmRefund = async (values) => {
    const data = {
      type: "Trans2",
      data: values,
    };

    //console.log(`Confirm Refund. Data: ${JSON.stringify(data.data)}`);

    try {
      setLoading(true); // Enabling spinner
      const serverResponse = await Request(data, "transactions");
      //console.log(`Server Response:: ${JSON.stringify(serverResponse.data)}`);
      setLoading(false); // Disabling spinner

      if (serverResponse.data === "success") {
        ToastAlert({
          type: "success",
          title:
            "Refund is successful. Please check your email to more details.",
          onClose: refresh,
        });
      } else {
        ToastAlert({
          type: "error",
          title: "Somthing went wrong. try again!",
          onClose: refresh,
        });
      }
    } catch (error) {
      console.log(`error in confirming refund infomation`, error);
      handleNotifications({
        type: "warning",
        title: "Network Issue!",
        body: "Try Again!",
      });
    }
  };

  // Refresh page
  const refresh = () => {
    setTimeout(() => {
      navigate(0);
    }, 3001);
  };

  // Handling agree and continue button
  const handleAgree = () => {
    //console.log(`User agree to refund`);
    setOpen(false);
    confirmRefund(formData);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "fit-content",
        bgcolor: "ghostwhite",
        minHeight: "calc(100vh - 500px)",
      }}
    >
      {tickets.length > 0 && (
        <Box
          bgcolor="#fff7e6"
          mb={2}
          width="100%"
          height="50px"
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          padding="0 10px"
        >
          <OnceFadeIn>
            <Texts fontColor="#ff9900" whiteSpace="normal" textAlign={"center"}>
              <InfoOutlinedIcon
                fontSize="16px"
                sx={{ mr: "5px", color: "#ff9900" }}
              />
              Here are the estimated times. They may change.
            </Texts>
          </OnceFadeIn>
        </Box>
      )}

      <Box sx={{ width: "100%", height: "fit-content", padding: "10px" }}>
        <Grid
          container
          spacing={2}
          display={"flex"}
          justifyContent={"space-around"}
          height={"100%"}
        >
          {tickets.length > 0 ? (
            tickets.map((ticket, index) => (
              <Grid item key={ticket.refNo}>
                <ViewFlyInY direction="bottom" delay={index * 100}>
                  <TicketCard data={ticket} handleCancel={handleCancel} />
                </ViewFlyInY>
              </Grid>
            ))
          ) : (
            <Box
              height={"100%"}
              width={"100%"}
              display={"flex"}
              margin={"50px 0"}
              flexDirection="column"
              alignItems={"center"}
            >
              <HighlightOffTwoToneIcon sx={{ fontSize: "100px", mb: "20px" }} />
              <Texts fontColor="textSecondary" fontSize="30px">
                No tickets available!
              </Texts>
            </Box>
          )}
        </Grid>
      </Box>

      <ConfirmBox
        open={open}
        data={formData}
        handleClose={() => setOpen(false)}
        handleAgree={handleAgree}
      />
    </Box>
  );
}
