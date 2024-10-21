import { db } from "../../db.js";
import createHttpError from "http-errors";

// Requesting ticket details from db
const Tkt2 = async (req, res, next) => {
  const { data } = req.query;

  console.log("\nTkt2:: Requesting ticket history of ", data);

  try {
    const query = `
        SELECT 
          JSON_OBJECT(
            'ticketNo', LPAD(t.ticketNo, 7, '0'),
            'customerName', CONCAT(u.fName, ' ', u.lName),
            'customerEmail', u.email,
            'customerMobile', u.mobile,
            'issuedDate', t.issuedDate,
            'issuedTime', t.issuedTime,
            'vehicalNo', v.vehicleRegNo,
            'type', v.serviceType,
            'routeNo', r.routeNo,
            'route', CONCAT(r.start, ' - ', r.end),
            'date', t.jrnDate,
            'time', s.departureTime,
            'from', fromStop.name,
            'to', toStop.name,
            'journey', t.distance,
            'price', FORMAT(t.ticketPrice, 2),
            'full', t.full,
            'half', t.half,
            'seatNos', t.seatNos
          ) AS result
        FROM 
          TICKET t
        JOIN 
          USERS u ON t.passengerID = u.userID
        JOIN
          SCHEDULE s ON s.scheduleID = t.scheduleID
        JOIN
          VEHICLE v ON v.vehicleID = s.vehicleID
        JOIN
          ROUTE r ON r.routeID = s.routeID
        JOIN
          BUSSTOP_NAMES fromStop ON fromStop.nameID = t.fromLocation
        JOIN
          BUSSTOP_NAMES toStop ON toStop.nameID = t.toLocation
        WHERE 
          t.ticketNo = ?
      `;

    const [results] = await db.query(query, data.refNo);

    if (results.length > 0) {
      const invoiceData = results[0].result;
      console.log("Ticket Details: ", invoiceData);
      res.status(200).json(invoiceData);
    } else {
      console.log(`Invoice not found with RefNo: ${data}`);
      throw createHttpError(404, "Invoice not found!");
    }
  } catch (err) {
    console.error("Error executing query:", err);
    next(createHttpError(503, "Database connection is failed!"));
  }
};

export default Tkt2;
