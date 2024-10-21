import React, { useState } from "react";
import Location from "../Components/Bookings/Location";
import BusList from "../Components/Bookings/BusList";
import SeatArrangement from "../Components/Bookings/SeatArrangement";
import Payment from "../Components/Bookings/Payment";
import ConditionalAnimation from "../Components/Animations/Entrance.Conditional";
import { OnceFlyInX } from "../Components/Animations/Entrance.Once";

// Initial booking form
const bookingFrom = {
  userID: "",
  name: "",
  email: "",
  mobile: "",
  from: {},
  to: {},
  issuedDate: "",
  issuedTime: "",
  date: "",
  seatNos: "",
  aproxDepT: "",
  aproxAriT: "",
  journey: "",
  full: "",
  half: "",
  unitPrice: "",
  totalPrice: "",
  discount: "0",
  scheduleId: "",
};

// Steps to the stepper
const steps = ["Add Locations", "Select Bus", "Select Seats", "Payment"];

export default function Bookings({ language, setLoading }) {
  // Variable to store active step
  const [activeStep, setActiveStep] = useState(0);
  const [prevStep, setPrevStep] = useState(0);

  // Variable to store booking information
  const [bookingData, setBookingData] = useState(bookingFrom);

  // Variable to store seat infomation
  const [seats, setSeats] = useState({});

  /* useEffect(()=>{
    console.log('bookingData: ' + JSON.stringify(bookingData) + '\nSeat infomation: ' + JSON.stringify(seats));
  }, [bookingData, seats]) */

  return (() => {
    switch (activeStep) {
      case 1:
        return (
          <ConditionalAnimation
            key={1}
            condition1={activeStep > prevStep}
            Animation1={OnceFlyInX}
            condition2={activeStep < prevStep}
            Animation2={OnceFlyInX}
            props1={{ direction: "right" }}
          >
            <BusList
              setActiveStep={setActiveStep}
              activeStep={activeStep}
              setPrevStep={setPrevStep}
              bookingData={bookingData}
              setBookingData={setBookingData}
              setLoading={setLoading}
              steps={steps}
              setSeats={setSeats}
            />
          </ConditionalAnimation>
        );

      case 2:
        return (
          <ConditionalAnimation
            key={2}
            condition1={activeStep > prevStep}
            Animation1={OnceFlyInX}
            props1={{ direction: "right" }}
            condition2={activeStep < prevStep}
            Animation2={OnceFlyInX}
          >
            <SeatArrangement
              setActiveStep={setActiveStep}
              activeStep={activeStep}
              setPrevStep={setPrevStep}
              bookingData={bookingData}
              setBookingData={setBookingData}
              steps={steps}
              seats={seats}
            />
          </ConditionalAnimation>
        );

      case 3:
        return (
          <OnceFlyInX direction="right">
            <Payment
              setActiveStep={setActiveStep}
              activeStep={activeStep}
              setPrevStep={setPrevStep}
              bookingData={bookingData}
              setBookingData={setBookingData}
              setLoading={setLoading}
              steps={steps}
            />
          </OnceFlyInX>
        );

      default:
        return (
          <Location
            setActiveStep={setActiveStep}
            activeStep={activeStep}
            prevStep={prevStep}
            setPrevStep={setPrevStep}
            bookingData={bookingData}
            setBookingData={setBookingData}
            setLoading={setLoading}
            steps={steps}
          />
        );
    }
  })();
}
