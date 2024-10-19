import createHttpError from "http-errors";
import { db } from "../../db.js";
import { journeyDetails } from "../../utils/journey_details.js";

export const getSchedule = async (req, res, next) => {
  const { busId, baseDate, offset } = req.query.data;
  console.log("\nRequesting bus schedules: ", req.query.data);

  // Calculating date
  let originalDate = new Date(baseDate);
  originalDate.setDate(originalDate.getDate() + parseInt(offset));
  const formattedDate = originalDate.toISOString().split("T")[0];
  console.log("Formated Date: ", formattedDate);

  try {
    // Finding basic infomation
    const sql = `
        SELECT 
            s.scheduleID AS id,
            s.status,
            s.linkedBus,
            JSON_LENGTH(s.bookedSeats) AS passengers,
            JSON_OBJECT(
                'time', s.departureTime,
                'place', r.start
            ) AS departure,
            JSON_OBJECT(
                'time', s.arrivalTime,
                'place', r.end
            ) AS arrival,
            CONCAT(r.routeNo, " | ", r.start, " - ", r.end) AS route,
            r.routeType,
            CONCAT(f.lat, ", ", f.lng) AS startLocation,
            CONCAT(e.lat, ", ", e.lng) AS endLocation
        FROM 
            SCHEDULE s
        JOIN
            ROUTE r ON r.routeID = s.routeID
        JOIN
            BUSSTOP_LOCATIONS f ON s.startLocation = f.locationID
        JOIN
            BUSSTOP_LOCATIONS e ON s.endLocation = e.locationID
        WHERE
            s.date = ? AND s.vehicleID = ?
    `;
    const values = [formattedDate, busId];

    const [results] = await db.query(sql, values);
    console.log("SCHEDULES", results);

    // Making schedule list
    if (results.length === 0) {
      return res.status(200).json([]);
    }

    const scheduleList = await Promise.all(
      results.map(async (schedule) => {
        const journey = await journeyDetails(
          schedule.startLocation,
          schedule.startLocation,
          schedule.endLocation,
          baseDate,
          "00:00"
        );

        console.log("Journey Details: ", journey);

        return {
          ...schedule,
          distance: journey.distance.toFixed(1),
          duration: journey.duration,
        };
      })
    );

    console.log("Schedule List: ", scheduleList);
    res.status(200).json(scheduleList);
  } catch (error) {
    console.log(error.message + "\n");
    next(createHttpError(503, "Database connection is failed!"));
  }
};

/* Status Types: 
      1. completed - Ride is already completed
      2. active    - Ride is currently at active state
      3. replace   - Ride is replced with another bus (linkedBus indicates the other busID)
      4. cancel    - Ride is canceled and refunded all tickets 
      5. awaiting  - Requested ride is awaiting confirmation from second bus (linkedBus indicates the requested busID)
      6. pending   - Ride is awaiting confirmation from second bus (linkedBus indicates the other busID)
*/

export const updateSchedule = async (req, res, next) => {
  console.log("Updating bus schedule data");
  res.json("success");
};
