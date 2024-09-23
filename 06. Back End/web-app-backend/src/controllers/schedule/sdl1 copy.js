// Shcedule data
import createHttpError from "http-errors";
import { db } from "../../db.js";
import { journeyDetails } from "./journey_details.js";

// Frontend send the {from:fromID, to:toID, date:date}. Then need to fetch the corresponding shedule details according to it and send to the frontend
const Sdl1 = (req, res, next) => {
  const { data } = req.body;
  console.log("SDL1:: Requesting bus schedules according to ", data);

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

  db.query(sql1, values1, async (err1, result1) => {
    try {
      if (err1) {
        console.log(err1.message);
        next(createHttpError(503, "Database connection is failed!"));
      } else {
        if (result1.length > 1) {
          const busStops = [
            ...new Map(
              result1.map((busStop) => [busStop.name, busStop])
            ).values(),
          ];

          const origin = `${busStops[0].lat}, ${busStops[0].lng}`;
          const destination = `${busStops[1].lat}, ${busStops[1].lng}`;
          const commonRoutes = busStops[0].routes.filter((route) =>
            busStops[1].routes.includes(route)
          );

          if (commonRoutes.length > 0) {
            const details = await journeyDetails(origin, destination);

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

            db.query(sql2, [commonRoutes, data.date], (err2, result2) => {
              if (err2) {
                console.log(err2.message);
                next(createHttpError(503, "Database connection is failed!"));
              } else {
                let scheduleDetails = result2.map((result) => {
                  return {
                    ...result,
                    ...details,
                    from: busStops[0].name,
                    to: busStops[1].name,
                    price: "30.00",
                  };
                });

                for (let i = 0; i < scheduleDetails.length; i++) {
                  scheduleDetails[i].id = (i + 1).toString();
                }

                console.log("Available Busses", scheduleDetails);
                res.status(200).json(scheduleDetails);
              }
            });
          } else {
            console.log("Common Routes: ", commonRoutes);
            res.status(200).json([]);
          }
        } else {
          console.log("Data not found!");
          next(createHttpError(404, "Data Not Found!"));
        }
      }
    } catch (error) {
      console.log(error);
      next(createHttpError(500, "Internal Error!"));
    }
  });
};

export default Sdl1;
