import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Grid,
  IconButton,
  Paper,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { QuickCard } from "../MyBusses/Bus.Detail";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PaymentsIcon from "@mui/icons-material/Payments";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import { PieChartWithCenterLabel } from "../Charts/PieChart";
import Texts from "../InputItems/Texts";
import { LineChart } from "@mui/x-charts";
import { Skeleton, Tooltip } from "@mui/joy";
import CachedIcon from "@mui/icons-material/Cached";
import { ViewZoomIn } from "../Animations/Entrance.View";
import { ToastAlert } from "../MyNotifications/WindowAlerts";
import { getData } from "../../APIs/NodeBackend2";
import useDateAndTime from "../../Utils/useDateAndTime";

// Today
const TODAY = new Date();
const YEAR = TODAY.getFullYear();
const MONTH = TODAY.getMonth() + 1;
const DATE = TODAY.getDate();
const getDay = (day) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day].toUpperCase();
};

// Line Chart Parameters
const BASE_HEIGHT = 390; // Chart height
const OFFSET = 20 + 5 + 5; // fontsize + top + bottom
const LENGTH = 180; // Length of a legend key

export default function Earnings({ setLoading, language }) {
  const { date } = useDateAndTime();
  const [rows, setRows] = useState(0);
  const containerRef = useRef(null);
  const userID =
    JSON.parse(localStorage.getItem("userId")) ||
    JSON.parse(sessionStorage.getItem("userId"));

  // Variable to hold the General Data
  const [general, setGeneral] = useState({
    loaded: false,
    data: {},
  });

  // Variable to hold summary data
  const [summary, setSummary] = useState({
    loaded: false,
    data: [],
  });

  // Variable to hold the today income
  const [income, setIncome] = useState({
    loaded: false,
    data: [],
    earning: 0,
  });

  // Fetching data
  useEffect(() => {
    getGeneral();
    getSummary("week");
    getIncome();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Finding number of rows
  useEffect(() => {
    if (general.loaded) {
      const width = containerRef.current.offsetWidth;
      const count = summary.data.length;
      //console.log('width: ', width, '   count:', count);
      setRows(parseInt((LENGTH * count) / width));
    }
  }, [summary, general]);

  // API to fetch general data
  const getGeneral = async () => {
    const data = { userID, YEAR, MONTH, DATE };
    try {
      setLoading(true); // Enabling spinner
      const serverResponse = await getData("income/general", data);
      //console.log('Income Data General: ', serverResponse.data);
      setGeneral({ loaded: true, data: serverResponse.data });
    } catch (error) {
      console.log("Error in fetching general data!");
      ToastAlert({
        type: "error",
        title: "Something went wrong!\nPlease reload page again.",
      });
    } finally {
      setLoading(false); // Disabling spinner
    }
  };

  // API to fetch summary data
  const getSummary = async (value) => {
    const data = {
      userID,
      type: value,
      YEAR,
      MONTH,
      DATE,
    };

    try {
      const serverResponse = await getData("income/summary", data);
      //console.log('Income Data Summary: ', serverResponse.data);
      setSummary({ loaded: true, data: serverResponse.data });
    } catch (error) {
      console.log("Error in fetching income summary!");
      ToastAlert({
        type: "error",
        title: "Something went wrong!\nPlease reload page again.",
      });
    }
  };

  // API to fetch summary data
  const getIncome = async () => {
    const data = { userID, date };
    try {
      const serverResponse = await getData("income/income", data);
      //console.log('Income Data Income: ', serverResponse.data);
      setIncome({
        loaded: true,
        data: serverResponse.data.graphData,
        earning: serverResponse.data.earning,
      });
    } catch (error) {
      console.log("Error in fetching general data!");
      ToastAlert({
        type: "error",
        title: "Something went wrong!\nPlease reload page again.",
      });
    }
  };

  // Handling summary buttons
  const handleChange = (e) => {
    //console.log(e.target.id, ' is clicked.');
    setSummary({ ...summary, loaded: false });
    getSummary(e.target.id);
  };

  // Handling reload button
  const handleReload = () => {
    setIncome({ ...income, loaded: false });
    getIncome();
  };

  return (
    <Paper
      sx={{
        width: "calc(100% - 40px)",
        bgcolor: "rgb(255,255,255,0.8)",
        height: "calc(76vh - 40px)",
        overflow: "auto",
        margin: "20px",
        padding: "20px 0 0 20px",
      }}
    >
      {general.loaded && (
        <Grid container spacing={2} mb={2} minWidth={"390px"}>
          {/* Quick Cards */}
          <Grid item xs={12} md={6} lg={7}>
            <Grid
              container
              spacing={2}
              padding={0}
              justifyContent={"space-around"}
              width={"100%"}
            >
              <Grid item>
                <ViewZoomIn>
                  <QuickCard
                    title={"Earnings (LKR)"}
                    amount={general.data.earning.amount}
                    increment={general.data.earning.increment}
                    icon={
                      <PaymentsIcon
                        sx={{ color: "#1a76d2", fontSize: "25px" }}
                      />
                    }
                  />
                </ViewZoomIn>
              </Grid>

              <Grid item>
                <ViewZoomIn delay={100}>
                  <QuickCard
                    title={"Withdrawals (LKR)"}
                    amount={general.data.withdraw.amount}
                    increment={general.data.withdraw.increment}
                    icon={
                      <PointOfSaleIcon
                        sx={{ color: "#dd0233", fontSize: "25px" }}
                      />
                    }
                  />
                </ViewZoomIn>
              </Grid>

              <Grid item>
                <ViewZoomIn delay={200}>
                  <QuickCard
                    title={"Balance (LKR)"}
                    amount={general.data.balance.amount}
                    increment={general.data.balance.increment}
                    icon={
                      <AccountBalanceWalletIcon
                        sx={{ color: "#ff9900", fontSize: "25px" }}
                      />
                    }
                  />
                </ViewZoomIn>
              </Grid>

              <Grid item>
                <ViewZoomIn delay={400}>
                  <QuickCard
                    title={"Withdrawable Amount (LKR)"}
                    amount={general.data.withdrawable.amount}
                    increment={null}
                    icon={
                      <LocalAtmOutlinedIcon
                        sx={{ color: "#04aa6d", fontSize: "25px" }}
                      />
                    }
                  />
                </ViewZoomIn>
              </Grid>
            </Grid>
          </Grid>

          {/* PieChart */}
          <Grid item xs={12} md={6} lg={5} textAlign={"center"} p={2} pb={0}>
            {income.loaded ? (
              <Card
                sx={{
                  width: "100%",
                  height: "100%",
                  padding: "20px 0",
                  borderRadius: "12px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <Box display={"flex"} alignItems={"center"} gap={1}>
                  <Texts fontColor="textSecondary" variant={"h6"}>
                    {`${YEAR}-${String(MONTH).padStart(2, "0")}-${String(
                      DATE
                    ).padStart(2, "0")} | ${getDay(TODAY.getDay())}`}
                  </Texts>
                  <Tooltip title={"Refresh"}>
                    <IconButton color="primary" onClick={handleReload}>
                      <CachedIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                <PieChartWithCenterLabel
                  label={`Earning (LKR)\n${parseInt(
                    income.earning
                  ).toLocaleString()}`}
                  data={income.data}
                  rows={rows}
                />
              </Card>
            ) : (
              <Skeleton width={"390px"} height={"318px"} />
            )}
          </Grid>

          {/* Summary */}
          <Grid item xs={12} p={2}>
            <Card
              sx={{
                padding: "20px",
                width: "100%",
                borderRadius: "12px",
                cursor: "pointer",
                minHeight: "120px",
              }}
            >
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  md={6}
                  textAlign={{ xs: "center", md: "start" }}
                >
                  <Texts variant={"h6"} fontColor="textSecondary">
                    SUMMARY OF INCOME
                  </Texts>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  textAlign={{ xs: "center", md: "end" }}
                >
                  <ButtonGroup variant="outlined" sx={{ height: "30px" }}>
                    <Button onClick={handleChange} id="year">
                      Year
                    </Button>
                    <Button onClick={handleChange} id="month">
                      Month
                    </Button>
                    <Button onClick={handleChange} id="week">
                      Week
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Grid>

              <Box
                width={"100%"}
                ref={containerRef}
                overflow={"auto"}
                display={"flex"}
                justifyContent={"space-around"}
                height={"max-content"}
              >
                {summary.loaded ? (
                  <LineChart
                    series={summary.data}
                    slotProps={{
                      legend: {
                        position: { horizontal: "middle", vertical: "bottom" },
                      },
                    }}
                    height={BASE_HEIGHT + rows * OFFSET}
                    margin={{ bottom: 30 + rows * OFFSET }}
                    xAxis={[{ scaleType: "point", data: [1, 2, 3, 4, 5] }]}
                  />
                ) : (
                  <Skeleton
                    sx={{
                      width: "340px",
                      height: "28px",
                      mt: "20px",
                      borderRadius: "12px",
                    }}
                  />
                )}
              </Box>
            </Card>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
}
