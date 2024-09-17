import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Avatar,
  Button,
  CardContent,
} from "@mui/material";
import team from "../Images/team2.jpg";
import Texts from "../Components/InputItems/Texts";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import SecurityIcon from "@mui/icons-material/Security";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { GetResponse } from "../APIs/NodeBackend";
import {
  ViewFadeIn,
  ViewFlyInX,
  ViewFlyInY,
  ViewZoomIn,
} from "../Components/Animations/Entrance.View";

const values = [
  {
    title: "Reliability",
    description:
      "We are committed to providing dependable service to our customers. Punctuality and consistency are at the core of our operations, ensuring a seamless travel experience for everyone.",
    icon: <SecurityIcon sx={{ fontSize: 45, color: "#ffcc00" }} />,
    color: "#ffcc00",
  },
  {
    title: "Customer-Centric",
    description:
      "Our customers are at the heart of every decision we make. We prioritize safety, comfort, and convenience to ensure that our passengers have a positive and hassle-free journey.",
    icon: <DirectionsBusIcon sx={{ fontSize: 45, color: "#00bfff" }} />,
    color: "#00bfff",
  },
  {
    title: "Innovation",
    description:
      "We continually explore new technologies and approaches to enhance the booking process, improve safety features, and provide a superior travel experience.",
    icon: <AutorenewIcon sx={{ fontSize: 45, color: "#32cd32" }} />,
    color: "#32cd32",
  },
  {
    title: "Community",
    description:
      "We are dedicated to giving back to the communities we serve by supporting local businesses, reducing our environmental footprint, and promoting safe and sustainable travel.",
    icon: <VolunteerActivismIcon sx={{ fontSize: 45, color: "#ff0066" }} />,
    color: "#ff0066",
  },
];

const impact = [
  {
    icon: <ConfirmationNumberIcon sx={{ fontSize: 45, color: "#127be4" }} />,
    bgc: "#d0e5fa",
    bc: "#127be4",
    title: "1M+",
    text: "Tickets Booked",
  },
  {
    icon: <DirectionsBusFilledIcon sx={{ fontSize: 45, color: "#04aa6d" }} />,
    bgc: "#cdeee2",
    bc: "#04aa6d",
    title: "500+",
    text: "Buses Registered",
  },
  {
    icon: <HowToRegIcon sx={{ fontSize: 45, color: "#de0032" }} />,
    bgc: "#f8ccd6",
    bc: "#de0032",
    title: "10K+",
    text: "Employees Registerd",
  },
  {
    icon: <EmojiEmotionsIcon sx={{ fontSize: 45, color: "#ffcc00" }} />,
    bgc: "#fff5cc",
    bc: "#ffcc00",
    title: "50K+",
    text: "Satisfied Customers",
  },
];

export default function About({ setLoading, language }) {
  const isLogged = sessionStorage.getItem("isLogged") || false;

  // Variable to hold the team members data
  const [teamMembers, setTeamMembers] = useState({
    loaded: false,
    members: [],
  });

  // Getting all members
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true); // Enabling spinner
        const serverResponse = await GetResponse("team");
        console.log("Members: ", serverResponse.data);
        setTeamMembers({ loaded: true, members: serverResponse.data });
      } catch (error) {
        console.log("Error in fetching news");
      } finally {
        setLoading(false); // Disabling spinner
      }
    };

    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box width="100%" bgcolor={"ghostwhite"} pb={5}>
      {/* Header Section */}
      <Box
        textAlign="center"
        mb={7}
        sx={{
          backgroundImage: `url(${team})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "300px",
          display: "flex",
          justifyContent: "start",
          alignItems: "end",
          padding: "0 5%",
          "@media (max-width: 600px)": {
            height: "auto",
            aspectRatio: "3/1",
            backgroundSize: "contain",
            p: "20px 0",
            justifyContent: "center",
          },
        }}
      >
        <ViewZoomIn>
          <Texts variant="h3" fontColor={{ xs: "white", md: "black" }} mb={2}>
            About Us
          </Texts>
        </ViewZoomIn>
      </Box>

      {/* Our Story */}
      <Box mb={7} px={"10%"}>
        <Texts variant="h4" mb={2}>
          Our Story
        </Texts>
        <ViewFlyInX>
          <Texts
            variant="body1"
            whiteSpace="normal"
            mb={2}
            fontWeight="normal"
            textAlign={"justify"}
          >
            e-conductor started with a simple idea: to make public
            transportation more efficient and accessible for everyone. Over the
            years, we've grown into a leading platform for bus ticket booking
            and management, offering live bus tracking, easy seat reservation,
            and more.
          </Texts>
          <Texts
            variant="body1"
            whiteSpace="normal"
            mb={2}
            fontWeight="normal"
            textAlign={"justify"}
          >
            From our humble beginnings, we've expanded our services to meet the
            growing needs of passengers and bus operators alike. Today,
            eConductor is a trusted name in the industry, known for our
            commitment to innovation and customer satisfaction.
          </Texts>
        </ViewFlyInX>
      </Box>

      {/* Mission & Vision */}
      <Box mb={7} px={"10%"}>
        <Texts variant="h4" mb={2}>
          Vision & Mission
        </Texts>
        <Grid container spacing={3}>
          {/* Vision Card */}
          <Grid item xs={12} sm={6} justifyContent="center" display={"flex"}>
            <ViewZoomIn>
              <Card
                elevation={3}
                sx={{
                  borderRadius: "15px",
                  boxShadow: 3,
                  maxWidth: "370px",
                  width: "100%",
                  height: "100%",
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <RemoveRedEyeIcon sx={{ fontSize: 50, color: "#FFA500" }} />
                  <Typography variant="h6" fontWeight="bold" mt={2}>
                    VISION
                  </Typography>
                  <Texts
                    whiteSpace="normal"
                    variant="body2"
                    color="textSecondary"
                    mt={2}
                  >
                    To be the global leader in public transportation solutions,
                    ensuring safe, reliable, and sustainable travel for millions
                    of people every day.
                  </Texts>
                </CardContent>
              </Card>
            </ViewZoomIn>
          </Grid>

          {/* Mission Card */}
          <Grid item xs={12} sm={6} justifyContent="center" display={"flex"}>
            <ViewZoomIn delay={100}>
              <Card
                elevation={3}
                sx={{
                  borderRadius: "15px",
                  boxShadow: 3,
                  maxWidth: "370px",
                  width: "100%",
                  height: "100%",
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <RocketLaunchIcon sx={{ fontSize: 50, color: "#FF4500" }} />
                  <Typography variant="h6" fontWeight="bold" mt={2}>
                    MISSION
                  </Typography>
                  <Texts
                    whiteSpace="normal"
                    variant="body2"
                    color="textSecondary"
                    mt={2}
                  >
                    To revolutionize public transportation by providing a
                    seamless, user-friendly platform that connects passengers
                    and bus operators, enhancing the travel experience for
                    everyone.
                  </Texts>
                </CardContent>
              </Card>
            </ViewZoomIn>
          </Grid>
        </Grid>
      </Box>

      {/* Our Values */}
      <Box mb={7} px={"10%"}>
        <Texts variant="h4" mb={2}>
          Our Values
        </Texts>
        <Grid container spacing={3} justifyContent={"space-around"}>
          {values.map((value, index) => (
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              key={index}
              justifyContent="center"
              display={"flex"}
            >
              <ViewFlyInX delay={index * 100}>
                <Card
                  sx={{
                    borderRadius: "16px",
                    borderTop: `4px solid ${value.color}`,
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                    height: "100%",
                    width: "100%",
                    maxWidth: "230px",
                  }}
                >
                  <CardContent>
                    <Box display="flex" justifyContent="center" mb={2}>
                      {value.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      textAlign="center"
                      fontWeight={"bold"}
                      gutterBottom
                    >
                      {value.title}
                    </Typography>
                    <Texts
                      variant="body2"
                      textAlign="center"
                      fontWeight="normal"
                      whiteSpace="normal"
                    >
                      {value.description}
                    </Texts>
                  </CardContent>
                </Card>
              </ViewFlyInX>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Meet the Team */}
      <Box mb={7} px={"10%"}>
        <Texts variant="h4" mb={2}>
          Meet the Team
        </Texts>
        <Grid container spacing={3} justifyContent={"space-around"}>
          {teamMembers.loaded &&
            teamMembers.members.map((member, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={index}
                justifyContent="center"
                display={"flex"}
              >
                <ViewFlyInY delay={index * 100}>
                  <Card
                    elevation={3}
                    sx={{
                      height: "100%",
                      width: "100%",
                      maxWidth: "370px",
                      borderRadius: "17px",
                      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      p: 2,
                      textAlign: "center",
                    }}
                  >
                    <Avatar
                      src={member.avatar}
                      alt={member.name}
                      sx={{ width: 100, height: 100, mb: 2 }}
                    />
                    <Texts variant="h6" whiteSpace="normal">
                      {member.name}
                    </Texts>
                    <Texts variant="subtitle1" color="textSecondary">
                      {member.title}
                    </Texts>
                    <Texts
                      variant="body2"
                      fontWeight="normal"
                      mt={1}
                      textAlign="center"
                      whiteSpace="normal"
                    >
                      {member.bio}
                    </Texts>
                  </Card>
                </ViewFlyInY>
              </Grid>
            ))}
        </Grid>
      </Box>

      {/* Our Impact */}
      <Box mb={7} px={"10%"}>
        <Texts variant="h4" mb={2}>
          Our Impact
        </Texts>
        <Grid container spacing={3} justifyContent={"space-around"}>
          {impact.map((item, index) => (
            <Grid
              item
              key={index}
              xs={12}
              md={6}
              lg={3}
              justifyContent={"space-around"}
              display={"flex"}
            >
              <ViewFadeIn
                delay={index * 100}
                sx={{
                  width: "100%",
                  justifyContent: "space-around",
                  display: "flex",
                }}
              >
                <Card
                  elevation={3}
                  sx={{
                    height: "100%",
                    width: "100%",
                    maxWidth: "370px",
                    borderRadius: "15px",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    p: 2,
                  }}
                >
                  <Box
                    minWidth={"60px"}
                    minHeight={"60px"}
                    bgcolor={item.bgc}
                    border={`2px solid ${item.bc}`}
                    borderRadius={"15px"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    {item.icon}
                  </Box>
                  <Box>
                    <Texts variant={"h4"} fontColor={item.bc}>
                      {item.title}
                    </Texts>
                    <Texts variant={"subtitle"} fontColor={item.bc}>
                      {item.text}
                    </Texts>
                  </Box>
                </Card>
              </ViewFadeIn>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call to Action */}
      <Box textAlign="center" mt={6}>
        <ViewZoomIn>
          <Texts variant="h5" mb={3}>
            {isLogged ? "Ready to Book Your Ticket?" : "Ready to Join Us?"}
          </Texts>
          <Button
            variant="contained"
            color="primary"
            href={isLogged ? "/booking" : "/signin"}
          >
            {isLogged ? "Book Now" : "Sign Up Now"}
          </Button>
        </ViewZoomIn>
      </Box>
    </Box>
  );
}
