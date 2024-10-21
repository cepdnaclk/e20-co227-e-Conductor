import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { GoPasskeyFill } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import { handleNotifications } from "../MyNotifications/FloatingNotifications";
import { getSessionData } from "../SessionData/Sessions";
import "./login1.css";
import { Link } from "react-router-dom";
import { postData } from "../../APIs/NodeBackend2";

function Login({
  data,
  sendResponse,
  language,
  setIsLogged,
  rememberMe,
  setLoading,
}) {
  // possible responses
  const userTypes = ["passenger", "employee", "owner"];
  const empTypes = ["None", "Driver", "Conductor", "Both"];
  const emailPattren = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  // variable for mobile number
  const [number, setNumber] = useState("");

  // variable for userData
  const [userData, setUserData] = useState(data);

  // variable for rememberMe
  const [remember, setRemember] = useState(false);

  // Effect to handle session data
  useEffect(() => {
    const fetchData = async () => {
      const sessionData = await getSessionData();
      //console.log(`SessionData:: ${JSON.stringify(sessionData)}`);
      setUserData({ ...userData, sessionData: sessionData });
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Effect to handle user validation after userId state changes
  useEffect(() => {
    //console.log(`ServerUserId useEffect:: ${userData.userID}    ServerUserEmail:: ${userData.email}`);
    if (
      Number.isInteger(userData.userID) &&
      emailPattren.test(userData.email) &&
      userTypes.includes(userData.userType) &&
      empTypes.includes(userData.empType)
    ) {
      //console.log(`user data:: ${JSON.stringify(userData)}`);
      sendResponse(userData); // Send data to parent component
      rememberMe(remember);
    } else {
      console.log("Something went wrong");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.userID, userData.email, userData.empType, userData.userType]);

  // Handling submit
  const submit = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    if (number.length < 11) {
      handleNotifications({
        type: "error",
        title: "Invald mobile number!",
        body: "Please try again!",
      });
      //console.log("Invald mobile number!\nTry again!");
      setNumber("+94");
    } else {
      requestUserDetails(number);
    }
  };

  // Handling rememberMe
  const handleRemember = () => {
    setRemember(!remember);
    //console.log('Remember Me:',remember);
  };

  // Use effect for get the user id and email from our server
  const requestUserDetails = async (data) => {
    //console.log("request user details:: data:", data);

    try {
      setLoading(true); // Enabling spinner
      const serverResponse = await postData("users/req1", data);
      if (serverResponse.status === 200) {
        const { userID, email, userType, empType } = serverResponse.data;
        //console.log(`ServerUserId:: ${userID}    ServerUserEmail:: ${email}     serverUserType: ${userType}    serverEmpType: ${empType}`);
        setUserData({
          ...userData,
          userID: userID,
          mobile: number,
          email: email,
          userType: userType,
          empType: empType,
        });
      } else {
        handleNotifications({
          type: "error",
          title: "Invalid mobile number!",
          body: "Please try again!",
        });
        reset();
      }
    } catch (error) {
      console.error(error);
      handleNotifications({
        type: "warning",
        title: "Network Error!",
        body: "Network connection is unstable. Please reload page again.",
      });
      reset();
    } finally {
      setLoading(false); // Disabling spinner
    }
  };

  const reset = () => {
    setNumber("+94");
    setUserData({
      ...userData,
      userID: "",
      email: "",
      userType: "",
      empType: "",
    });
  };

  return (
    <div className="wrapper">
      <form onSubmit={submit}>
        <h1>
          <b>Login</b>
        </h1>
        <label>Enter your mobile number</label>
        <br />
        <Container className="input-box">
          <PhoneInput
            country={"lk"}
            value={number}
            onlyCountries={["lk"]}
            countryCodeEditable={false}
            onChange={setNumber}
            inputProps={{
              maxLength: 15, // Country code (3) + 9 digits + 3 spaces
            }}
          />
          <GoPasskeyFill className="user-with-key" />
        </Container>
        <label className="RememberMe">
          <input type="checkbox" checked={remember} onChange={handleRemember} />{" "}
          Remember me
        </label>
        <Button variant="light" className="custombutton" type="submit">
          <b>Continue</b>
        </Button>

        <Container className="button-holder">
          <div className="text-between-lines">
            <hr />
            <span>or</span>
            <hr />
          </div>

          <Button
            variant="light"
            name="google"
            //onClick={handleClick}
            className="custombutton2"
          >
            <FcGoogle className="icon" /> Continue with Google
          </Button>
        </Container>
        <div className="register">
          <p>
            Don't have an account? <Link to={`/signup`}>Register</Link>{" "}
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
