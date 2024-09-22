import React, { useEffect, useState } from "react";
import CustomTable from "../Tables/Table";
import { useNavigate } from "react-router-dom";
import { postData } from "../../APIs/NodeBackend2";
import { ToastAlert } from "../MyNotifications/WindowAlerts";

// Data for table header
const headCells = [
  {
    id: "id",
    align: "left",
    label: "Ticket\u00a0No",
  },
  {
    id: "date",
    align: "left",
    label: "Date",
  },
  {
    id: "from",
    align: "left",
    label: "From",
  },
  {
    id: "to",
    align: "left",
    label: "To",
  },
  {
    id: "status",
    align: "center",
    label: "Ticket\u00a0Status",
  },
  {
    id: "amount",
    align: "right",
    label: "Price\u00a0(LKR)",
  },
];

// Filter list
const filterList = ["Available", "Used", "Refunded"];

export default function Tickets({ language, setLoading }) {
  const navigate = useNavigate();
  const userID = JSON.parse(
    localStorage.getItem("userId") ||
      JSON.parse(sessionStorage.getItem("userId"))
  );

  // Variable for storing credits
  const [availableTickets, setAvailableTickets] = useState(0);

  // Data for table body
  const [tickets, setTickets] = useState([]);

  // Requesting ticket data from node backend
  useEffect(() => {
    const getData = async (data) => {
      //console.log("Requesting Ticket History: ", data);

      try {
        setLoading(true); // Enabling spinner
        const serverResponse = await postData("tickets/tkt1", data);
        /* console.log(
          `Tickets:: ${JSON.stringify(
            serverResponse.data
          )}  Net Ticket Count:: ${serverResponse.data.tickets.length}`
        ); */
        setAvailableTickets(serverResponse.data.available);
        setTickets(serverResponse.data.tickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        ToastAlert({
          type: "warning",
          title: "Your connection is unstable.\nPlease reload page again.",
        });
      } finally {
        setLoading(false); // Disabling spinner
      }
    };

    getData(userID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle Button Click
  const handleButton = (e) => {
    //console.log(`${e.target.id} Clicked.   RefNo: ${e.target.value}`);
    sessionStorage.setItem("TicketNo", JSON.stringify(e.target.value));
    navigate("/invoice");
  };

  return tickets.length >= 0 ? (
    <CustomTable
      headerData={headCells}
      bodyData={tickets}
      filterData={filterList}
      filterColumn={"status"}
      title={`Available\u00a0Tickets:\u00a0${availableTickets}`}
      button2Label={"View"}
      handleButton={handleButton}
    />
  ) : (
    <></>
  );
}
