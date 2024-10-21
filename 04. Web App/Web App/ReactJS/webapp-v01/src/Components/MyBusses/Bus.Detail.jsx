import {
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Card,
  Grid,
  IconButton,
  Switch,
  Tab,
  Tabs,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Texts from "../InputItems/Texts";
import Link from "@mui/material/Link";
import { Link as NavLink } from "react-router-dom";
import CommuteIcon from "@mui/icons-material/Commute";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import WarningIcon from "@mui/icons-material/Warning";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import { Comparator } from "./Bus.General";
import { LineChart } from "@mui/x-charts";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { Skeleton, Tooltip } from "@mui/joy";
import { Navigate } from "react-router-dom";
import ThreeButtonDialog from "../DialogBox/ThreeButtonDialog";
import { ToastAlert } from "../MyNotifications/WindowAlerts";
import AlertDialog from "../DialogBox/AlertDialog";
import SingleInputDialog from "../DialogBox/SingleInputDialog";
import { ViewFlyInX } from "../Animations/Entrance.View";
import { getData, updateData } from "../../APIs/NodeBackend2";
import useDateAndTime from "../../Utils/useDateAndTime";

// Months list
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const today = new Date();
const YEAR = today.getFullYear();
const MONTH = today.getMonth() + 1;
const DATE = today.getDate();

// Function to create a card
export function QuickCard({ amount, increment, title, icon }) {
  return (
    <Card
      sx={{
        width: "300px",
        height: "150px",
        borderRadius: "10px",
        display: "flex",
        padding: "15px",
        flexDirection: "column",
        opacity: "80%",
        cursor: "pointer",
      }}
    >
      <Box
        width={"100%"}
        height={"30px"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Texts fontColor="textSecondary">{title}</Texts>
        {icon}
      </Box>

      <Box
        width={"100%"}
        height={"120px"}
        display={"flex"}
        alignItems={"center"}
        gap={"15px"}
      >
        <Texts variant={"h4"}>{parseInt(amount).toLocaleString()}</Texts>
        {increment && <Comparator increment={increment} />}
      </Box>

      <Texts fontColor="textSecondary">
        Since {`01 ${MONTHS[MONTH - 1]} ${YEAR}`}
      </Texts>
    </Card>
  );
}

// Function to create a schedule card
function ScheduleCard({ details, handleAction }) {
  const { date, time } = useDateAndTime();

  // Variable to hold the action dialog box state
  const [actionDialog, setActionDialog] = useState({
    open: false,
    id: "",
    info: {},
  });

  // Variable to hold the pending dialog box
  const [pendingDialog, setPendingDialog] = useState({
    open: false,
    id: "",
  });

  // Variable to hold the active dialog box
  const [activeDialog, setActiveDialog] = useState({
    open: false,
    id: "",
  });

  // Variable to hold the cancel dialog box
  const [subDialog, setsubDialog] = useState("");

  // Managing action
  const manageAction = (action) => {
    if (action !== "close") {
      handleAction({ id: actionDialog.id, action, other: { date, time } });
    }
    setActionDialog((prev) => ({ ...prev, open: false }));
  };

  // Managing pending
  const managePending = () => {
    handleAction({ id: pendingDialog.id, action: "reactivate" });
    setPendingDialog((prev) => ({ ...prev, open: false }));
  };

  // Managing active
  const manageActive = (value) => {
    //console.log(`Active box changed: ${value}`);
    setsubDialog("");
    handleAction({ id: activeDialog.id, action: "replace", other: value });
    setActiveDialog((prev) => ({ ...prev, open: false }));
  };

  // Managing cancel event
  const manageCancel = () => {
    //console.log(`Schedule ${activeDialog.id} is canceled`);
    setsubDialog("");
    handleAction({
      id: activeDialog.id,
      action: "cancel",
      other: { date, time },
    });
    setActiveDialog((prev) => ({ ...prev, open: false }));
  };

  return (
    <Card sx={{ height: "fit-content", width: "100%" }}>
      {(() => {
        switch (details.status) {
          case "completed": {
            return (
              <Box
                width={"100%"}
                bgcolor={"#f2e6d9"}
                height={"42px"}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                padding={"0 20px"}
              >
                <Box display={"flex"} alignItems={"center"}>
                  <TaskAltIcon
                    sx={{ color: "#aa753c", mr: "10px", fontSize: "19px" }}
                  />
                  <Texts fontColor="#aa753c">Completed</Texts>
                </Box>
                <Texts fontColor="#aa753c">{details.passengers} Bookings</Texts>
              </Box>
            );
          }

          case "pending": {
            return (
              <Box
                width={"100%"}
                bgcolor={"#fff4e6"}
                height={"42px"}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                padding={"0 20px"}
              >
                <Box display={"flex"} alignItems={"center"}>
                  <WarningIcon
                    sx={{ color: "#ff9501", mr: "10px", fontSize: "19px" }}
                  />
                  <Texts fontColor="#ff9501">Pending</Texts>
                </Box>
                <Texts fontColor="#ff9501">{details.passengers} Bookings</Texts>
                <Tooltip title="Enable">
                  <Switch
                    onClick={() => {
                      setPendingDialog((prev) => ({
                        open: true,
                        id: details.id,
                      }));
                    }}
                    checked={false}
                    variant="outlined"
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#ff9501",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: "#ffca80",
                        },
                    }}
                  />
                </Tooltip>
              </Box>
            );
          }

          case "awaiting": {
            return (
              <Box
                width={"100%"}
                bgcolor={"#eef1ff"}
                height={"42px"}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                padding={"0 20px"}
              >
                <Box display={"flex"} alignItems={"center"}>
                  <HourglassBottomIcon
                    sx={{ color: "#5271ff", mr: "10px", fontSize: "19px" }}
                  />
                  <Texts fontColor="#5271ff">Confirmation</Texts>
                </Box>
                <Texts fontColor="#5271ff">{details.passengers} Bookings</Texts>
                <Tooltip title="Take Action">
                  <IconButton
                    sx={{ ":hover": { bgcolor: "#ffe0b3" } }}
                    onClick={() => {
                      setActionDialog({
                        open: true,
                        id: details.id,
                        info: details.other,
                      });
                    }}
                  >
                    <FlashOnIcon fontSize="small" sx={{ color: "#e68a00" }} />
                  </IconButton>
                </Tooltip>
              </Box>
            );
          }

          case "cancel": {
            return (
              <Box
                width={"100%"}
                bgcolor={"#fce6ea"}
                height={"42px"}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                padding={"0 20px"}
              >
                <Box display={"flex"} alignItems={"center"}>
                  <CancelIcon
                    sx={{ color: "#dc0030", mr: "10px", fontSize: "19px" }}
                  />
                  <Texts fontColor="#dc0030">Canceled</Texts>
                </Box>
                <Texts fontColor="#dc0030">{details.passengers} Refunds</Texts>
              </Box>
            );
          }

          case "replace": {
            return (
              <Box
                width={"100%"}
                bgcolor={"#f9e6ff"}
                height={"42px"}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                padding={"0 20px"}
              >
                <Box display={"flex"} alignItems={"center"}>
                  <PublishedWithChangesIcon
                    sx={{ color: "#b000e6", mr: "10px", fontSize: "19px" }}
                  />
                  <Texts fontColor="#b000e6">
                    Replaced with {details.linkedVehiNum}
                  </Texts>
                </Box>
              </Box>
            );
          }

          case "extra": {
            return (
              <Box
                width={"100%"}
                bgcolor={"#e6ffff"}
                height={"42px"}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                padding={"0 20px"}
              >
                <Box display={"flex"} alignItems={"center"}>
                  <FiberNewIcon
                    sx={{ color: "#006666", mr: "10px", fontSize: "19px" }}
                  />
                  <Texts fontColor="#006666">
                    Additional schedule from {details.linkedVehiNum}
                  </Texts>
                </Box>
              </Box>
            );
          }

          default: {
            return (
              <Box
                width={"100%"}
                bgcolor={"#e6f7f0"}
                height={"42px"}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                padding={"0 20px"}
              >
                <Box display={"flex"} alignItems={"center"}>
                  <CheckCircleIcon
                    sx={{ color: "#04aa6d", mr: "10px", fontSize: "19px" }}
                  />
                  <Texts fontColor="#04aa6d">Active</Texts>
                </Box>
                <Texts fontColor="#04aa6d">{details.passengers} Bookings</Texts>
                <Tooltip title="Cancel">
                  <Switch
                    checked
                    onClick={() => {
                      setActiveDialog({ open: true, id: details.id });
                    }}
                    variant="outlined"
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#00a06b",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: "#4dbd97",
                        },
                    }}
                  />
                </Tooltip>
              </Box>
            );
          }
        }
      })()}

      <Grid
        container
        spacing={2}
        padding={"5px 15px"}
        display={"flex"}
        alignItems={"center"}
        textAlign={"center"}
        mb={1}
      >
        <Grid item xs={6} lg={3}>
          <Texts variant={"caption"}>Departure</Texts>
          <Texts variant={"h5"}>{details.departure.time}</Texts>
          <Texts variant={"body2"}>{details.departure.place}</Texts>
        </Grid>

        <Grid item xs={6} lg={3}>
          <Texts variant={"caption"}>Arrival</Texts>
          <Texts variant={"h5"}>{details.arrival.time}</Texts>
          <Texts variant={"body2"}>{details.arrival.place}</Texts>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Texts variant={"body1"}>{details.route}</Texts>
          <Texts variant={"body1"}>
            {details.distance} km | {details.duration} | {details.routeType}
          </Texts>
        </Grid>
      </Grid>

      <ThreeButtonDialog
        open={actionDialog.open}
        title={"Request Confirmation"}
        message={`${actionDialog.info.name} has requested to handle this schedule with your vehicle no ${actionDialog.info.vehiNum}. Do you need to accept it?`}
        handleResponse={manageAction}
      />

      <AlertDialog
        open={pendingDialog.open}
        title={"Re-Activate Schedule"}
        message={
          "Do you want to cancel the current request and reactivate the schedule?"
        }
        handleClose={() => {
          setPendingDialog((prev) => ({ ...prev, open: false }));
        }}
        handleConfirm={managePending}
      />

      <ThreeButtonDialog
        open={activeDialog.open}
        title={"Canceling Schedule"}
        message={
          "To cancel the current schedule, please select one of the options."
        }
        middle={"Cancel"}
        right={"Replace"}
        handleResponse={(event) => {
          //console.log(`Active sub event: ${event}`);
          if (event === "close") {
            setActiveDialog((prev) => ({ ...prev, open: false }));
          } else {
            setsubDialog(event);
          }
        }}
      />

      <AlertDialog
        open={subDialog.toLowerCase() === "cancel"}
        title={"Cancelling the schedule"}
        message={"Are you sure you want to cancel the current schedule?"}
        extraItems={<NavLink to={"/terms"}>Terms & Conditions</NavLink>}
        handleClose={() => {
          setsubDialog("");
        }}
        handleConfirm={manageCancel}
      />

      {subDialog.toLowerCase() === "replace" && (
        <SingleInputDialog
          open={subDialog.toLowerCase() === "replace"}
          title={"Replace New Bus"}
          message={"Please enter new vehicle number here."}
          handleClose={() => setsubDialog("")}
          handleContinue={manageActive}
        />
      )}
    </Card>
  );
}

// Main function
export default function BusDetail({ language, setLoading }) {
  const busId = JSON.parse(sessionStorage.getItem("busID"));

  // Variable to hold bus general details
  const [details, setDetails] = useState({
    loaded: false,
    data: {},
  });

  // Variable to hold income informations
  const [incData, setIncData] = useState({
    loaded: false,
    xLabels: [],
    receivedData: [],
    refundData: [],
    earningData: [],
  });

  // Variable to hold the schedule data
  const [scheduleList, setScheduleList] = useState({
    loaded: false,
    schedules: [],
  });

  // Variable to hold the activeDate
  const [offset, setOffset] = useState(0);

  // Fetching data
  useEffect(() => {
    GetBusData();
    GetIncome();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetching schedules
  useEffect(() => {
    GetSchedules(offset);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  // Handling income buttons
  const handleIncome = (e) => {
    //console.log(e.target.id, 'is Clicked');
    setIncData({ ...incData, loaded: false });
    GetIncome(e.target.id);
  };

  // Handling schedule
  const handleSchedule = (event, newValue) => {
    setOffset(newValue);
    //console.log(newValue);
  };

  // Handling actions
  const handleAction = ({ id, action, other }) => {
    //console.log(`Schedule: ${id}  Action: ${action}  Other: ${other}`);
    updateScedule({ id, action, other });
  };

  // API to fetch income information
  const GetIncome = async (value) => {
    const data = {
      busId: busId,
      type: value || "week",
      DATE,
      MONTH,
      YEAR,
    };

    try {
      //console.log("Sending Date: ", data);
      const serverResponse = await getData("bus/income", data);
      const { xLabels, refundData, receivedData, earningData } =
        serverResponse.data;
      //console.log(`Type: ${data.type}\nX-Labels: ${JSON.stringify(xLabels)}\nRecieved: ${JSON.stringify(receivedData)}\nRefung: ${JSON.stringify(refundData)}\nEarn: ${JSON.stringify(earningData)}`);
      setIncData({
        loaded: true,
        xLabels,
        receivedData,
        refundData,
        earningData,
      });
    } catch (error) {
      console.log("Error in income data!");
      ToastAlert({
        type: "warning",
        title: "Something went wrong! Please try again!",
      });
    }
  };

  // API to fetch schedule data
  const GetSchedules = async (offset = 0) => {
    const data = {
      busId,
      baseDate: `${YEAR}-${MONTH}-${DATE}`,
      offset: offset,
    };
    try {
      const serverResponse = await getData("bus/schedule", data);
      //console.log(`Schedule on ${JSON.stringify(data)}:: ${JSON.stringify(serverResponse.data)}`);
      setScheduleList({ loaded: true, schedules: serverResponse.data });
    } catch (error) {
      console.log("Error in schedule data!");
      ToastAlert({
        type: "warning",
        title: "Something went wrong! Please try again!",
      });
    }
  };

  // API to fetch general data
  const GetBusData = async () => {
    const data = { busId, MONTH, YEAR };

    try {
      setLoading(true); // Enabling spinner
      const serverResponse = await getData("bus/general", data);
      //console.log('Bus details: ', JSON.stringify(serverResponse.data));
      setDetails({ loaded: true, data: serverResponse.data });
    } catch (error) {
      console.log("Error in fetching bus data!");
      ToastAlert({
        type: "warning",
        title: "Something went wrong! Please try again!",
      });
    } finally {
      setLoading(false); // Disabling spinner
    }
  };

  // API to update schedule data
  const updateScedule = async ({ id, action, other }) => {
    const data = {
      scheduleID: id,
      action,
      other: other || null,
    };

    try {
      setLoading(true); // Enabling spinner
      const serverResponse = await updateData("bus/schedule", data);
      setLoading(false); // Disabling spinner
      if (serverResponse.data === "success") {
        ToastAlert({
          type: "success",
          title: "Schedule updated successfully!",
          onClose: GetSchedules(offset),
        });
      } else {
        ToastAlert({
          type: "error",
          title: "Something went wrong. Please try again in a few seconds.",
        });
      }
    } catch (error) {
      console.log("Error in updating schedule data");
    }
  };

  return details.loaded ? (
    Object.keys(details.data).length > 0 ? (
      <Box
        width={"100%"}
        height={"fit-content"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={"20px"}
      >
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{
            width: "100%",
            height: "60px",
            bgcolor: "#e7e8ea",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Link underline="hover" color="inherit" href="/mybuses">
            My Buses
          </Link>
          <Texts color="text.primary">{details.data.regNo}</Texts>
        </Breadcrumbs>

        {/* Quick Cards */}
        <Grid
          container
          spacing={2}
          padding={0}
          justifyContent={"space-around"}
          width={"100%"}
        >
          <Grid item>
            <ViewFlyInX>
              <QuickCard
                title={"Rides"}
                amount={details.data.rides.amount}
                increment={details.data.rides.increment}
                icon={
                  <CommuteIcon sx={{ color: "#1a76d2", fontSize: "25px" }} />
                }
              />
            </ViewFlyInX>
          </Grid>

          <Grid item>
            <ViewFlyInX delay={100}>
              <QuickCard
                title={"Bookings"}
                amount={details.data.bookings.amount}
                increment={details.data.bookings.increment}
                icon={
                  <LocalActivityOutlinedIcon
                    sx={{ color: "#ff9900", fontSize: "25px" }}
                  />
                }
              />
            </ViewFlyInX>
          </Grid>

          <Grid item>
            <ViewFlyInX delay={200}>
              <QuickCard
                title={"Cancelations"}
                amount={details.data.cancel.amount}
                increment={details.data.cancel.increment}
                icon={
                  <CancelOutlinedIcon
                    sx={{ color: "#dd0233", fontSize: "25px" }}
                  />
                }
              />
            </ViewFlyInX>
          </Grid>

          <Grid item>
            <ViewFlyInX delay={300}>
              <QuickCard
                title={"Earnings (LKR)"}
                amount={details.data.earn.amount}
                increment={details.data.earn.increment}
                icon={
                  <LocalAtmOutlinedIcon
                    sx={{ color: "#04aa6d", fontSize: "25px" }}
                  />
                }
              />
            </ViewFlyInX>
          </Grid>
        </Grid>

        {/* Summary */}
        <Card
          sx={{
            padding: "20px",
            width: "calc(100% - 40px)",
            borderRadius: "12px",
            cursor: "pointer",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} textAlign={{ xs: "center", sm: "start" }}>
              <Texts variant={"h6"} fontColor="textSecondary">
                SUMMARY OF INCOME
              </Texts>
            </Grid>
            <Grid item xs={12} sm={6} textAlign={{ xs: "center", sm: "end" }}>
              <ButtonGroup variant="outlined" sx={{ height: "30px" }}>
                <Button onClick={handleIncome} id="year">
                  1Y
                </Button>
                <Button onClick={handleIncome} id="month">
                  1M
                </Button>
                <Button onClick={handleIncome} id="week">
                  7D
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>

          <Box
            width={"100%"}
            overflow={"auto"}
            display={"flex"}
            justifyContent={"space-around"}
            height={"400px"}
          >
            {incData.loaded ? (
              <LineChart
                series={[
                  { data: incData.receivedData, label: "Received" },
                  { data: incData.refundData, label: "Refund" },
                  { data: incData.earningData, label: "Earning" },
                ]}
                xAxis={[{ scaleType: "point", data: incData.xLabels }]}
              />
            ) : (
              <Skeleton
                sx={{
                  width: "calc(100% - 40px)",
                  height: "400px",
                  mt: "20px",
                  borderRadius: "0 0 12px 12px",
                }}
              />
            )}
          </Box>
        </Card>

        {/* Schedule */}
        <Grid container spacing={2} padding={2}>
          <Grid item xs={12} md={7} lg={9} padding={1}>
            <Card
              sx={{
                width: "100%",
                borderRadius: "12px",
                cursor: "pointer",
                height: "100%",
              }}
            >
              <Grid container spacing={2} padding={2} mb={2}>
                <Grid
                  item
                  xs={12}
                  md={3}
                  textAlign={{ xs: "center", md: "start" }}
                >
                  <Texts variant={"h6"} fontColor="textSecondary">
                    SCHEDULE
                  </Texts>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={9}
                  textAlign={{ xs: "center", md: "end" }}
                >
                  <Texts variant={"h6"} fontColor="textSecondary">
                    {details.data.regNo} | {details.data.org} |{" "}
                    {details.data.service}
                  </Texts>
                </Grid>
              </Grid>

              <Box
                display={"flex"}
                justifyContent={"space-around"}
                width={"100%"}
                mb={2}
              >
                <Tabs
                  value={offset}
                  onChange={handleSchedule}
                  variant="scrollable"
                  scrollButtons
                  allowScrollButtonsMobile
                >
                  <Tab
                    label={`${YEAR}-${String(MONTH).padStart(2, "0")}-${String(
                      DATE
                    ).padStart(2, "0")}`}
                  />
                  <Tab
                    label={`${YEAR}-${String(MONTH).padStart(2, "0")}-${String(
                      DATE + 1
                    ).padStart(2, "0")}`}
                  />
                  <Tab
                    label={`${YEAR}-${String(MONTH).padStart(2, "0")}-${String(
                      DATE + 2
                    ).padStart(2, "0")}`}
                  />
                  <Tab
                    label={`${YEAR}-${String(MONTH).padStart(2, "0")}-${String(
                      DATE + 3
                    ).padStart(2, "0")}`}
                  />
                  <Tab
                    label={`${YEAR}-${String(MONTH).padStart(2, "0")}-${String(
                      DATE + 4
                    ).padStart(2, "0")}`}
                  />
                  <Tab
                    label={`${YEAR}-${String(MONTH).padStart(2, "0")}-${String(
                      DATE + 5
                    ).padStart(2, "0")}`}
                  />
                  <Tab
                    label={`${YEAR}-${String(MONTH).padStart(2, "0")}-${String(
                      DATE + 6
                    ).padStart(2, "0")}`}
                  />
                </Tabs>
              </Box>

              <Box
                bgcolor={"ghostwhite"}
                height={"100%"}
                padding={2}
                pt={4}
                gap={2}
                display={"flex"}
                flexDirection={"column"}
              >
                {scheduleList.loaded ? (
                  scheduleList.schedules.length > 0 ? (
                    scheduleList.schedules.map((schedule, index) => (
                      <ViewFlyInX key={schedule.id}>
                        <ScheduleCard
                          details={schedule}
                          handleAction={handleAction}
                        />
                      </ViewFlyInX>
                    ))
                  ) : (
                    <Texts textAlign="center">No Schedules!</Texts>
                  )
                ) : (
                  <Skeleton
                    sx={{
                      width: { xs: "400px", lg: "870px" },
                      height: "20px",
                      borderRadius: "20px",
                      mt: "-20px",
                    }}
                  />
                )}
              </Box>
            </Card>
          </Grid>

          <Grid
            item
            xs={12}
            md={5}
            lg={3}
            display={"flex"}
            justifyContent={"space-between"}
            flexDirection={"column"}
            padding={1}
          >
            <Card
              sx={{
                width: "100%",
                padding: "10px",
                borderRadius: "12px",
                textAlign: "center",
                mb: "15px",
                height: "360px",
              }}
            >
              <Texts variant={"h6"} fontColor="textSecondary">
                CALENDAR
              </Texts>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateCalendar"]}>
                  <DemoItem>
                    <DateCalendar
                      sx={{ width: "100%", m: 0, p: 0, height: "310px" }}
                      value={dayjs(today)}
                      readOnly
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </Card>

            <Card
              sx={{
                width: "100%",
                padding: "10px",
                borderRadius: "12px",
                textAlign: "center",
                height: "calc(100% - 380px)",
              }}
            >
              <Texts variant={"h6"} fontColor="textSecondary">
                EVENTS
              </Texts>
              <Box
                mt={1}
                padding={"10px"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-around"}
                alignItems={"center"}
                bgcolor={"#e6e6e6"}
                height={"calc(100% - 40px)"}
                borderRadius={"12px"}
              >
                <Texts>No Events</Texts>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    ) : (
      <Navigate to={"/forbidden"} />
    )
  ) : (
    <Box height={"calc(100vh - 500px)"} width={"100%"} />
  );
}
