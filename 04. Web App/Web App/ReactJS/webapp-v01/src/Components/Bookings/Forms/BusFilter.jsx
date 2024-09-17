import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Stepper from "../../ProgressBars/Stepper";

export default function BusFilter({
  steps,
  activeStep,
  handleBack,
  setServiceFilter,
  setRouteFilter,
  setOrgFilter,
}) {
  // variable to store service items states
  const [serviceItems, setServiceItems] = useState({
    "super luxury": false,
    "semi luxury": false,
    luxury: false,
    normal: false,
  });

  // variable to store route items states
  const [routeItems, setRouteItems] = useState({
    expressway: false,
    normalway: false,
  });

  // variable to store organization catagory items states
  const [orgItems, setOrgItems] = useState({
    sltb: false,
    privert: false,
  });

  // Handling service items
  const handleService = (event) => {
    setServiceItems({
      ...serviceItems,
      [event.target.value]: event.target.checked,
    });
  };

  // Handling route items
  const handleRoute = (event) => {
    setRouteItems({
      ...routeItems,
      [event.target.value]: event.target.checked,
    });
  };

  // Handling organization catagory items
  const handleOrg = (event) => {
    setOrgItems({ ...orgItems, [event.target.value]: event.target.checked });
  };

  // Send service filter list
  useEffect(() => {
    const checkedKeys = Object.keys(serviceItems).filter(
      (key) => serviceItems[key]
    );
    //console.log('Service Checked items:', checkedKeys);
    setServiceFilter(checkedKeys);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceItems]);

  // Send route filter list
  useEffect(() => {
    const checkedKeys = Object.keys(routeItems).filter(
      (key) => routeItems[key]
    );
    //console.log('Route Checked items:', checkedKeys);
    setRouteFilter(checkedKeys);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeItems]);

  // Send org filter list
  useEffect(() => {
    const checkedKeys = Object.keys(orgItems).filter((key) => orgItems[key]);
    //console.log('Org Checked items:', checkedKeys);
    setOrgFilter(checkedKeys);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgItems]);

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
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <FormControl component="fieldset">
            <FormLabel
              component="legend"
              sx={{
                whiteSpace: "nowrap",
                fontFamily: "Open Sans",
                fontWeight: "bold",
              }}
            >
              Service Type
            </FormLabel>
            <FormGroup
              aria-label="position"
              row
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <FormControlLabel
                value="super luxury"
                control={
                  <Checkbox
                    checked={serviceItems.super}
                    onChange={handleService}
                  />
                }
                label="Super Luxury"
                labelPlacement="end"
              />
              <FormControlLabel
                value="luxury"
                control={
                  <Checkbox
                    checked={serviceItems.luxury}
                    onChange={handleService}
                  />
                }
                label="Luxury"
                labelPlacement="end"
              />
              <FormControlLabel
                value="semi luxury"
                control={
                  <Checkbox
                    checked={serviceItems.semi}
                    onChange={handleService}
                  />
                }
                label="Semi Luxury"
                labelPlacement="end"
              />
              <FormControlLabel
                value="normal"
                control={
                  <Checkbox
                    checked={serviceItems.normal}
                    onChange={handleService}
                  />
                }
                label="Normal"
                labelPlacement="end"
              />
            </FormGroup>
          </FormControl>

          <FormControl component="fieldset" fullWidth>
            <FormLabel
              component="legend"
              sx={{
                whiteSpace: "nowrap",
                fontFamily: "Open Sans",
                fontWeight: "bold",
              }}
            >
              Route Type
            </FormLabel>
            <FormGroup
              aria-label="position"
              row
              sx={{ display: "flex", width: "100%" }}
            >
              <Grid container>
                <Grid item xs={6}>
                  <FormControlLabel
                    value="expressway"
                    control={
                      <Checkbox
                        checked={routeItems.express}
                        onChange={handleRoute}
                      />
                    }
                    label="Expressway"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    value="normalway"
                    control={
                      <Checkbox
                        checked={routeItems.normal}
                        onChange={handleRoute}
                      />
                    }
                    label="Normalway"
                    labelPlacement="end"
                  />
                </Grid>
              </Grid>
            </FormGroup>
          </FormControl>

          <FormControl component="fieldset" fullWidth>
            <FormLabel
              component="legend"
              sx={{
                whiteSpace: "nowrap",
                fontFamily: "Open Sans",
                fontWeight: "bold",
              }}
            >
              Organization Catagory
            </FormLabel>
            <FormGroup
              aria-label="position"
              row
              sx={{ display: "flex", width: "100%" }}
            >
              <Grid container>
                <Grid item xs={6}>
                  <FormControlLabel
                    value="sltb"
                    control={
                      <Checkbox checked={orgItems.sltb} onChange={handleOrg} />
                    }
                    label="SLTB"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    value="private"
                    control={
                      <Checkbox checked={orgItems.pvt} onChange={handleOrg} />
                    }
                    label="Private"
                    labelPlacement="end"
                  />
                </Grid>
              </Grid>
            </FormGroup>
          </FormControl>
        </Box>

        <Box>
          <Button variant="outlined" fullWidth onClick={handleBack}>
            Back
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
