import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Stepper from "../../ProgressBars/Stepper";
import Texts, { StyledTextField } from "../../InputItems/Texts";
import { getData } from "../../../APIs/NodeBackend2";
import { ToastAlert } from "../../MyNotifications/WindowAlerts";

const StyledAutoComplete = ({ id, label, placeholder, onChange, options }) => (
  <Box
    sx={{ display: "flex", alignItems: "center", width: "100%", gap: "8px" }}
  >
    <Grid container direction="column">
      <Texts>{label}</Texts>
      <Autocomplete
        freeSolo
        id={id}
        //disableClearable
        options={options.map((option) => option.name)}
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            InputProps={{
              ...params.InputProps,
              type: "search",
              startAdornment: <SearchIcon sx={{ m: "0 10px 0 5px" }} />,
              style: { color: "black" },
            }}
            InputLabelProps={{ shrink: true }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "black" },
                "&:hover fieldset": { borderColor: "black" },
                "&.Mui-focused fieldset": { borderColor: "black" },
                color: "black",
              },
            }}
          />
        )}
      />
    </Grid>
  </Box>
);

export default function LocationForm({
  steps,
  activeStep,
  setFrom,
  setTo,
  date,
  setDate,
  dateError,
  setLoading,
  handleClick,
}) {
  // Variable to store text field states
  const sessionNames = sessionStorage.getItem("busStopNames");
  const [names, setNames] = useState(
    !sessionNames ? [] : JSON.parse(sessionNames)
  );

  // Fetching bus stop names from backend
  useEffect(() => {
    const fetch = async () => {
      //console.log('Fetching busstop names');
      try {
        setLoading(true); // Enabling spinner
        const serverResponse = await getData("busstops/names");
        //console.log(`busStopNames:: ${JSON.stringify(serverResponse.data)}`);
        sessionStorage.setItem(
          "busStopNames",
          JSON.stringify(serverResponse.data)
        );
        setNames(serverResponse.data);
      } catch (error) {
        console.log("error in fetching busstop names");
        ToastAlert({
          type: "warning",
          title: "Your connection is unstable.\nPlease reload page again.",
        });
      } finally {
        setLoading(false); // Disabling spinner
      }
    };

    //console.log(`number of stops: ${names.length}`);
    if (names.length === 0) {
      fetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          width: "100%",
          height: "calc(100% - 100px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <StyledAutoComplete
            id="from"
            placeholder="Enter location"
            label="From: "
            onChange={(e, value) =>
              setFrom(names.filter((name) => name.name === value)[0] || {})
            }
            options={names}
          />

          <StyledAutoComplete
            id="to"
            placeholder="Enter location"
            label="To: "
            onChange={(e, value) =>
              setTo(names.filter((name) => name.name === value)[0] || {})
            }
            options={names}
          />

          <StyledTextField
            id="date"
            label="Date: "
            type="date"
            inputProps={{ min: "2020-01-01", max: "2200-12-31" }}
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
            error={dateError}
            helperText={dateError && "Reservation must be more than 24 hours."}
          />
        </Box>

        <Box>
          <Button variant="contained" fullWidth onClick={handleClick}>
            Continue
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
