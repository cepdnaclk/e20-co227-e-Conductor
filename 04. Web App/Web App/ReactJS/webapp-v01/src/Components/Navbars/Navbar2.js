/*
  Title: Navigation Bar
  Customized by: BG
  Last Modified: 12/07/2024
  previous version is v8
*/

import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import logo from "../../Images/logo - no bkgnd.png";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import LogoutIcon from "@mui/icons-material/Logout";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PaymentsIcon from "@mui/icons-material/Payments";
import "./Navbar2.css";

function NavScrollExample({ isLogged, setIsLogged, language, setLanguage }) {
  const navigate = useNavigate();
  const location = useLocation();
  const specialPages = ["signin", "signup", "invoice"]; // Hide Nav bar for this pages
  const userType =
    JSON.parse(localStorage.getItem("userType")) ||
    JSON.parse(sessionStorage.getItem("userType"));

  // Identify current page
  const [page, setPage] = useState("home");

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    //console.log(`page: ${path}`);
    setPage(path.toLowerCase());
  }, [location.pathname]);

  // Set prefer language in the local memory
  const handleLanguage = (e) => {
    setLanguage(e.target.id);
  };

  // Handle logout
  const logout = () => {
    setIsLogged("false");
    navigate("/");
  };

  // Handle navigate
  const handleNavigate = (path) => {
    //console.log(path);
    //setAllowNavigate(true);
    navigate(path);
  };

  return specialPages.includes(page) ? (
    <></>
  ) : (
    <Navbar expand="lg" sticky="top" className="navbar">
      <Container fluid>
        <Navbar.Brand href="/">
          <Image src={logo} rounded className="logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Nav
            variant="underline"
            activeKey={page}
            className="navbar-nav"
            navbarScroll
          >
            <Nav.Link
              className="tab"
              eventKey="home"
              onClick={() => handleNavigate("/")}
            >
              {language === "sn" ? <>මුල්පිටුව</> : <>Home</>}
            </Nav.Link>
            <Nav.Link
              className="tab"
              eventKey="about"
              onClick={() => handleNavigate("/about")}
            >
              {language === "sn" ? <>විස්තර</> : <>About</>}
            </Nav.Link>
            {isLogged === "true" ? (
              <>
                {/* Common Tabs */}
                <Nav.Link
                  className="tab"
                  eventKey="booking"
                  onClick={() => handleNavigate("/booking")}
                >
                  {language === "sn" ? <>වෙන්කිරීම්</> : <>Booking</>}
                </Nav.Link>
                <Nav.Link
                  className="tab"
                  eventKey="avtickets"
                  onClick={() => handleNavigate("/avtickets")}
                >
                  {language === "sn" ? (
                    <>සක්‍රීය ප්‍රවේශපත්‍ර</>
                  ) : (
                    <>Available Tickets</>
                  )}
                </Nav.Link>

                {/* Clasification accroding to userType - web app no specifications on employees */}
                {userType === "owner" && (
                  <>
                    <Nav.Link
                      className="tab"
                      eventKey="mybuses"
                      onClick={() => handleNavigate("/mybuses")}
                    >
                      {language === "sn" ? <>මගේ බස්රථ</> : <>My Buses</>}
                    </Nav.Link>
                  </>
                )}
              </>
            ) : (
              <>
                <Nav.Link
                  className="tab"
                  eventKey="help"
                  onClick={() => handleNavigate("/help")}
                >
                  {language === "sn" ? <>උදව්</> : <>Help</>}
                </Nav.Link>
              </>
            )}

            <Container
              fluid
              className="d-flex justify-content-between align-items-top"
            >
              <Dropdown>
                <Dropdown.Toggle
                  className="dropdwn"
                  variant="light"
                  id="dropdown-basic"
                >
                  <b>{language === "sn" ? <>සිංහල</> : <>English</>}</b>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item id="sn" onClick={handleLanguage}>
                    සිංහල
                  </Dropdown.Item>
                  <Dropdown.Item id="en" onClick={handleLanguage}>
                    English
                  </Dropdown.Item>
                  {/*<Dropdown.Item id='தமிழ்' onClick={handleLanguage}>தமிழ்</Dropdown.Item>*/}
                </Dropdown.Menu>
              </Dropdown>
              {isLogged !== "true" ? (
                <Button
                  className="button"
                  variant="dark"
                  onClick={() => handleNavigate("/signin")}
                >
                  {language === "sn" ? <>පුරන්න</> : <>Login</>}
                </Button>
              ) : (
                <Dropdown align="end">
                  <Dropdown.Toggle className="dropdwn" variant="light">
                    <FaUserCircle className="icon" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleNavigate("/dashboard")}>
                      <DashboardCustomizeIcon />{" "}
                      {language === "sn" ? <>අයිතම පුවරුව</> : <>Dashboard</>}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleNavigate("/reload")}>
                      <PaymentsIcon />{" "}
                      {language === "sn" ? <>රීලෝඩ්</> : <>Reload</>}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleNavigate("/dashboard/settings")}
                    >
                      <SettingsIcon />{" "}
                      {language === "sn" ? <>සැකසුම්</> : <>Settings</>}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleNavigate("/help")}>
                      <HelpOutlineIcon />{" "}
                      {language === "sn" ? <>උදව්</> : <>Help</>}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={logout}>
                      <LogoutIcon />{" "}
                      {language === "sn" ? <>ඉවත්වන්න</> : <>Logout</>}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Container>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
