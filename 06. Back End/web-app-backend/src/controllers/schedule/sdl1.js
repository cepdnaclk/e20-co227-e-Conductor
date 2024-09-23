// Shcedule data
import createHttpError from "http-errors";
import { db } from "../../db.js";
import { journeyDetails } from "./journey_details.js";

// Frontend send the {from:fromID, to:toID, date:date}. Then need to fetch the corresponding shedule details according to it and send to the frontend
const Sdl1 = async (req, res, next) => {
  const { data } = req.body;
  const MinDistance = 3; // in km

  console.log("SDL1:: Requesting bus schedules according to ", data);

  try {
    const sql1 = `SELECT 
                    BUSSTOP_LOCATIONS.lat, 
                    BUSSTOP_LOCATIONS.lng, 
                    BUSSTOP_LOCATIONS.routes, 
                    BUSSTOP_NAMES.name
                  FROM 
                      BUSSTOP_LOCATIONS
                  JOIN 
                      BUSSTOP_NAMES ON BUSSTOP_LOCATIONS.nameID = BUSSTOP_NAMES.nameID
                  WHERE 
                      BUSSTOP_LOCATIONS.nameID IN (?, ?);
                  `;

    const values1 = [data.from, data.to];

    const [result1] = await db.query(sql1, values1);

    // Partial data
    if (result1.length < 2) {
      console.log("Data not found!");
      throw createHttpError(404, "Data not found");
    }

    // Bus stop details are completed
    console.log("Finding Common Roots");
    const busStops = [
      ...new Map(result1.map((busStop) => [busStop.name, busStop])).values(),
    ];

    const origin = `${busStops[0].lat}, ${busStops[0].lng}`;
    const destination = `${busStops[1].lat}, ${busStops[1].lng}`;
    const commonRoutes = busStops[0].routes.filter((route) =>
      busStops[1].routes.includes(route)
    );

    if (commonRoutes.length > 0) {
      // Getting journey details
      const details = await journeyDetails(origin, destination);

      // Calculating Fare
      const [fareDetails] = await db.query(
        `SELECT value FROM GENERAL WHERE item IN ('Ticket_Fee_Min', 'Ticket_Fee_Step');`
      );

      if (fareDetails.length != 2) {
        console.log("Fare data not found!");
        throw createHttpError(404, "Fare data not found!");
      }

      const minFare = parseFloat(fareDetails[0].value);
      const stepVal = parseFloat(fareDetails[1].value);
      const distance = parseFloat(details.journey);

      let fare;

      if (distance <= MinDistance) {
        fare = minFare.toFixed(2);
      } else {
        fare = (minFare + (distance - MinDistance) * stepVal).toFixed(2);
      }

      // Fetch available schedules based on common routes and the selected date
      const sql2 = `SELECT 
                        s.scheduleID AS 'id',
                        v.vehicleRegNo AS 'regNo',
                        v.serviceType AS 'service',
                        r.routeType,
                        r.routeNo,  
                        v.org,
                        s.bookedSeats AS 'booked',
                        v.seats,
                        s.closingDate AS 'closing'
                    FROM 
                        ROUTE r
                    JOIN 
                        SCHEDULE s ON r.routeID = s.routeID
                    JOIN 
                        VEHICLE v ON s.vehicleID = v.vehicleID
                    WHERE 
                        r.routeNo IN (?) AND s.date = ?;
                  `;

      const [result2] = await db.query(sql2, [commonRoutes, data.date]);

      let scheduleDetails = result2.map((result) => {
        return {
          ...result,
          ...details,
          from: busStops[0].name,
          to: busStops[1].name,
          price: fare,
        };
      });

      for (let i = 0; i < scheduleDetails.length; i++) {
        scheduleDetails[i].id = (i + 1).toString();
      }

      console.log("Available Busses", scheduleDetails);
      res.status(200).json(scheduleDetails);
    } else {
      console.log("Common Routes: ", commonRoutes);
      res.status(200).json([]);
    }
  } catch (error) {
    console.log(error);
    next(createHttpError(500, "Internal Error!"));
  }
};

export default Sdl1;
