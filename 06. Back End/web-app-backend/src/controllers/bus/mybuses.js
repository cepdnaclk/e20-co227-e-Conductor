import createHttpError from "http-errors";
import { db } from "../../db.js";

// Sending bus info
export const myBuses = async (req, res, next) => {
  const { buses, date, time } = req.query.data;
  console.log("\nRequesting owned buses:", req.query.data);

  // Finding details of the buses
  try {
    const sql = `
        SELECT 
            CAST (SCHEDULE.vehicleID AS CHAR) AS id,
            VEHICLE.vehicleRegNo AS regNo,
            CONCAT(ROUTE.routeNo, ' | ', ROUTE.\`start\`, ' - ', ROUTE.\`end\`) AS route,
            ROUTE.routeType,
            CONCAT(DRIVER.fName, ' ', DRIVER.lName) AS driver,
            CONCAT(CONDUCTOR.fName, ' ', CONDUCTOR.lName) AS conductor
        FROM 
            SCHEDULE
        JOIN 
            VEHICLE ON VEHICLE.vehicleID = SCHEDULE.vehicleID
        JOIN 
            ROUTE ON SCHEDULE.routeID = ROUTE.routeID
        JOIN 
            USERS DRIVER ON SCHEDULE.driverID = DRIVER.userID
        JOIN 
            USERS CONDUCTOR ON SCHEDULE.conductorID = CONDUCTOR.userID
        WHERE 
            VEHICLE.vehicleID IN (?) 
            AND date = ? 
            AND departureTime < ? 
            AND arrivalTime > ?;
    `;

    const [result1] = await db.query(sql, [buses, date, time, time]);
    const liveBuses = result1.map((bus) => bus.id);
    const parkedBuses = buses.filter((bus) => !liveBuses.includes(bus));

    console.log("Live Buses: ", liveBuses);
    console.log("Parked Buses: ", parkedBuses);
    const live = result1.map((bus) => ({ ...bus, status: "live" }));

    if (parkedBuses.length > 0) {
      const checkSql = `SELECT CAST(vehicleID AS CHAR) AS id, vehicleRegNo AS regNo FROM VEHICLE WHERE vehicleID in (?)`;
      const [result2] = await db.query(checkSql, [parkedBuses]);
      const parked = result2.map((bus) => ({ ...bus, status: "parked" }));
      const vehicles = [...live, ...parked];
      console.log("Vehicles: ", vehicles);
      res.status(200).json(vehicles);
    } else {
      const vehicles = [...live];
      console.log("Vehicles: ", vehicles);
      res.status(200).json(vehicles);
    }
  } catch (err) {
    console.log(err.message + "\n");
    next(createHttpError(503, "Database connection is failed!"));
  }
};
