import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { handleNotifications } from "../MyNotifications/FloatingNotifications";
import { Request } from "../../APIs/NodeBackend";
import "./OTP1.css";

export default function OTP({
  setIsLogged,
  userData,
  sendResponse,
  language,
  rememberMe,
  setLoading,
}) {
  // Language is not implemented yet
  // Variable for initial count
  let endTime = 120;

  // Initialize useNavigate hook
  const navigate = useNavigate();

  // Variable for athentication
  const [auth, setAuth] = useState(null);

  // variable where user entered otp is stored
  const [otp, setOtp] = useState("");

  // variable for disable otp field
  const [isDissable, setIsDissable] = useState(false);

  // variable for disable Resend button
  const [resendDissable, setresendDissable] = useState(true);

  // variable to store reamining time
  const [time, setTime] = useState(endTime);

  // Function to handle back button
  const backHandle = () => {
    sendResponse("none");
  };

  // Function to handle Resend Option
  const resendHandle = () => {
    if (resendDissable) {
      handleNotifications({
        type: "warning",
        title: "Wait!",
        body: "Wait untill countdown ends!",
      });
    } else {
      setTime(endTime);
      setIsDissable(false); // Disable OPT field
      requestOTP({ mobile: userData.mobile, email: userData.email }); // function to get the new OTP from the server
      setOtp("");
      handleNotifications({
        type: "info",
        title: "Resend OTP!",
        body: "New OTP is sent to your mobile number.",
      });
    }
  };

  // Function to handle login button
  const loginHandle = () => {
    //console.log(`otp: ${otp}`);
    if (otp !== "") {
      requestLoginAccess({
        mobile: userData.mobile,
        email: userData.email,
        value: otp,
        origin: "login",
      });
    } else {
      handleNotifications({
        type: "error",
        title: "Invalid OTP!",
        body: "OTP is invalid. Try Again!",
      });
    }
  };

  // Function to get the OTP from server
  const requestOTP = async (values) => {
    // Creating data object
    const data = {
      type: "loginOTP",
      data: values,
    };
    //console.log(`request message::   type: ${data.type}      data: ${JSON.stringify(data.data)}`);

    try {
      setLoading(true); // Enabling spinner
      const ServerResponse = await Request(data, "OTP");
      if (ServerResponse.data === "success") {
        setresendDissable(true);
      } else {
        console.log("Something went wrong! Please try again in few second.");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      handleNotifications({
        type: "warning",
        title: "Something went wrong!",
        body: "Please try again in few second.",
      });
    } finally {
      setLoading(false); // Disabling spinner
    }
  };

  // Function to get logging access
  const requestLoginAccess = async (values) => {
    // Creating data object
    const data = {
      type: "verify",
      data: values,
    };
    //console.log(`request message::   type: ${data.type}      userOTP: ${JSON.stringify(data.data)}`);

    try {
      setLoading(true); // Enabling spinner
      const serverRespose = await Request(data, "OTP");
      //console.log(`Authentication: ${serverRespose.data}`);
      setAuth(JSON.stringify(serverRespose.data));
    } catch (error) {
      console.error("Error adding user:", error);
      handleNotifications({
        type: "warning",
        title: "Network Issue!",
        body: "Try Again!",
      });
      setOtp("");
    } finally {
      setLoading(false); // Dissabling spinner
    }
  };

  // Function to get the OTP from server
  const sendLog = async (value) => {
    // Creating data object
    const data = {
      type: "Log3", // Posting user login informations
      data: value,
    };
    //console.log(`request message::   type: ${data.type}      data: ${data.data}`);

    try {
      setLoading(true); // Enabling spinner
      const serverRespose = await Request(data, "logs/users");
      if (serverRespose.data === "success") {
        setIsLogged("true");
        navigate("/");
        handleNotifications({
          type: "success",
          title: "Successful Login!",
          body: "Welcome to e-Conductor!.",
        });
      }
    } catch (error) {
      handleNotifications({
        type: "error",
        title: "Login is Failed!",
        body: "Try Again!",
      });
      console.error("Error loggin user:", error);
    } finally {
      setLoading(false); // Dissabling spinner
    }
  };

  // Send mobile and email to the backend and request OTP
  useEffect(() => {
    //console.log(`OTP SEND:: userID: ${userData.userID}    mobile: ${userData.mobile}   email: ${userData.email}`);
    requestOTP({ mobile: userData.mobile, email: userData.email });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Use effect for the authentication
  useEffect(() => {
    // Valid OTP
    if (auth === "true") {
      if (rememberMe) {
        localStorage.setItem("userId", JSON.stringify(userData.userID));
        localStorage.setItem("language", language);
        localStorage.setItem("userType", JSON.stringify(userData.userType));
        localStorage.setItem("empType", JSON.stringify(userData.empType));
      } else {
        sessionStorage.setItem("userId", JSON.stringify(userData.userID));
        sessionStorage.setItem("language", language);
        sessionStorage.setItem("userType", JSON.stringify(userData.userType));
        sessionStorage.setItem("empType", JSON.stringify(userData.empType));
      }
      sessionStorage.setItem("isLogged", "true");
      sessionStorage.setItem(
        "sessionData",
        JSON.stringify(userData.sessionData)
      );
      sendLog(userData);
    }
    // Invalid OTP
    else if (auth === "false") {
      handleNotifications({
        type: "error",
        title: "Invalid OTP!",
        body: "OTP is invalid. Try Again!",
      });
      setOtp("");
    }
    setAuth(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  // Use effect for the countdown
  useEffect(() => {
    if (time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      setIsDissable(true);
      setresendDissable(false);
      handleNotifications({
        type: "warning",
        title: "Time is out!",
        body: "Please click Resend OTP to get a new OTP.",
      });
    }
  }, [time]);

  return (
    <div className="OTP-Wrappper">
      <h3>Enter Your OTP</h3>
      <label>
        We sent an OTP to your mobile number and the email. It is valid for next{" "}
        {time} seconds.
      </label>

      <div className="otp-area">
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          //inputType='password'
          renderInput={(props) => <input {...props} disabled={isDissable} />}
          inputStyle={{
            width: "40px",
            height: "40px",
            border: "2px solid #666666",
            borderRadius: "4px",
            margin: "5px",
            backgroundColor: "rgba(255, 255, 255, 0.795)",
            color: "black",
            fontSize: "20px",
            cursor: "pointer",
          }}
        />
      </div>

      <div className="btn-container">
        <Button onClick={backHandle} variant="outline-light">
          Back
        </Button>
        <Button onClick={loginHandle} variant="light">
          Login
        </Button>
      </div>

      {/* Edit URL Here */}
      <label>
        Didn't recive an OTP?{" "}
        <span onClick={resendHandle} disabled={resendDissable}>
          <b>
            <u> Resend OTP </u>
          </b>
        </span>
      </label>
    </div>
  );
}
