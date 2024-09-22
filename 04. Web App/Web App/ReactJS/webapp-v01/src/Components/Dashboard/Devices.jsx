import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import ComputerIcon from "@mui/icons-material/Computer";
import TabletIcon from "@mui/icons-material/Tablet";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";
import { deleteData, getData } from "../../APIs/NodeBackend2";
import { ToastAlert } from "../MyNotifications/WindowAlerts";

export default function Devices({ setIsLogged, language, setLoading }) {
  const navigate = useNavigate();
  const currentSession = JSON.parse(sessionStorage.getItem("sessionData"));

  // Getting userID from local storage
  const userID = JSON.parse(
    localStorage.getItem("userId") ||
      JSON.parse(sessionStorage.getItem("userId"))
  );

  // Device data
  const [devices, setDevices] = useState([]);
  const [currentDevice, setCurrentDevice] = useState({});

  // Termination status
  useEffect(() => {
    if (userID) {
      getDevices(userID);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

  // Requesting device data from node backend
  const getDevices = async (data) => {
    //console.log("Requesting Device data ", data);
    try {
      setLoading(true); // Enabling spinner
      const serverResponse = await getData("logs", data);
      //console.log("Devices:: ", serverResponse.data);
      const rows = serverResponse.data;
      const filteredRow = rows.filter(
        (row) =>
          row.MAC === currentSession.MAC &&
          row.browser === currentSession.browser
      );
      //console.log(`filtered Row: ${JSON.stringify(filteredRow[0])}`);
      setCurrentDevice(filteredRow[0]);
      setDevices(rows);
    } catch (error) {
      console.error("Error fetching devices:", error);
      ToastAlert({
        type: "error",
        title: "Somthing went wrong! Please reload page again.",
      });
    } finally {
      setLoading(false); // Disabling spinner
    }
  };

  // Function to terminate session
  const sessionTerminate = async (values) => {
    // Creating data object
    const data = {
      userID: values.userID,
      MAC: values.mac,
      browser: values.browser,
    };
    //console.log("Requsest to terminate devices: ", data);

    try {
      // Need to update with checking status code
      setLoading(true);
      const serverResponse = await deleteData("logs", data);

      // Terminated successfully
      if (serverResponse.data === "success") {
        ToastAlert({
          type: "success",
          title: `Successfully terminate the session with \nMAC: ${values.mac}.`,
        });
      }

      // Terminated failed
      else {
        console.log("Termination error");
      }
    } catch (error) {
      console.error(
        `Error in terminating session: ${error} \n Refresh your browser.`
      );
      ToastAlert({
        type: "error",
        title: "Termination is failed. Try again!",
      });
    } finally {
      setLoading(false);
      setTimeout(() => {
        navigate(0);
      }, 3001);
    }
  };

  // handle logout button
  const logout = () => {
    setIsLogged("false");
    navigate("/");
  };

  // Handle Button Click
  const handleButton = (e) => {
    //sconsole.log(`Button is Clicked. Terminate the session with MAC: ${e.target.value} , ${e.target.name}.`);
    // Function to API call with backend
    sessionTerminate({
      userID: userID,
      mac: e.target.value,
      browser: e.target.name,
    });
  };

  return (
    <Paper
      sx={{
        display: "flex",
        width: "calc(100% - 50px)",
        height: "auto",
        opacity: "80%",
        maxHeight: "calc(76vh - 50px)",
        overflow: "auto",
        margin: "20px",
      }}
    >
      <TableContainer>
        <Table>
          <TableBody>
            {Object.keys(currentDevice).length > 0 ? (
              <TableRow key={currentDevice.logID}>
                <TableCell align="center">
                  {(() => {
                    switch (currentDevice.device) {
                      case "PC":
                        return <ComputerIcon sx={{ fontSize: "50px" }} />;
                      case "Tablet":
                        return <TabletIcon sx={{ fontSize: "50px" }} />;
                      case "Mobile":
                        return <PhoneAndroidIcon sx={{ fontSize: "50px" }} />;
                      default:
                        break;
                    }
                  })()}
                </TableCell>

                <TableCell>
                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    MAC: {currentDevice.MAC}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    {currentDevice.OS}
                  </Typography>
                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    {currentDevice.country}
                  </Typography>
                  <Typography
                    sx={{ whiteSpace: "nowrap", textJustify: "center" }}
                  >
                    Your Current Session{" "}
                    <CheckCircleOutlineIcon color="success" fontSize="17px" />
                  </Typography>
                  <Typography sx={{ whiteSpace: "nowrap" }}>
                    {currentDevice.browser}
                  </Typography>
                </TableCell>

                <TableCell align="center" sx={{ width: "200px" }}>
                  <Button
                    variant="outlined"
                    size="normal"
                    name={currentDevice.browser}
                    value={currentDevice.MAC}
                    onClick={logout}
                    sx={{
                      color: "black",
                      borderColor: "black",
                      fontFamily: "System-UI",
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                      "&:hover": {
                        backgroundColor: "rgb(0,0,0)",
                        color: "white",
                        border: "none",
                      },
                    }}
                  >
                    Logout
                  </Button>
                </TableCell>
              </TableRow>
            ) : (
              <></>
            )}
            {devices.length > 1 ? (
              devices.map((row) => (
                <TableRow key={row.logID}>
                  {row.MAC === currentSession.MAC &&
                  row.browser === currentSession.browser ? (
                    <></>
                  ) : (
                    <>
                      <TableCell align="center">
                        {(() => {
                          switch (row.device) {
                            case "PC":
                              return <ComputerIcon sx={{ fontSize: "50px" }} />;
                            case "Tablet":
                              return <TabletIcon sx={{ fontSize: "50px" }} />;
                            case "Mobile":
                              return (
                                <PhoneAndroidIcon sx={{ fontSize: "50px" }} />
                              );
                            default:
                              break;
                          }
                        })()}
                      </TableCell>

                      <TableCell>
                        <Typography sx={{ whiteSpace: "nowrap" }}>
                          MAC: {row.MAC}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography sx={{ whiteSpace: "nowrap" }}>
                          {row.OS}
                        </Typography>
                        <Typography sx={{ whiteSpace: "nowrap" }}>
                          {row.country}
                        </Typography>
                        <Typography sx={{ whiteSpace: "nowrap" }}>
                          {row.date} at {row.time}{" "}
                        </Typography>
                        <Typography sx={{ whiteSpace: "nowrap" }}>
                          {row.browser}
                        </Typography>
                      </TableCell>

                      <TableCell align="center" sx={{ width: "200px" }}>
                        <Button
                          variant="outlined"
                          size="normal"
                          name={row.browser}
                          value={row.MAC}
                          onClick={handleButton}
                          sx={{
                            color: "black",
                            borderColor: "black",
                            fontFamily: "System-UI",
                            fontWeight: "bold",
                            whiteSpace: "nowrap",
                            "&:hover": {
                              backgroundColor: "rgb(0,0,0)",
                              color: "white",
                              border: "none",
                            },
                          }}
                        >
                          Terminate
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
