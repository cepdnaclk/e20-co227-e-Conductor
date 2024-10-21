import createHttpError from "http-errors";
import { db } from "../../db.js";

function findIncrement(currentValue, lastValue) {
  let increment;
  if (lastValue != 0) {
    increment = (
      ((parseFloat(currentValue) - parseFloat(lastValue)) /
        parseFloat(lastValue)) *
      100
    ).toFixed(1);
  } else if (currentValue == 0) {
    increment = "0";
  } else {
    increment = "100";
  }
  return increment;
}

export const general = async (req, res, next) => {
  const { busId, MONTH, YEAR } = req.query.data;
  console.log("\nRequesting general bus info:", req.query.data);

  // Create bondries
  const currentMonthStart = `${YEAR}-${MONTH}-01`;
  const currentMonthEnd = `${YEAR}-${MONTH}-31`;
  const lastMonthStart =
    MONTH === "01"
      ? `${parseInt(YEAR) - 1}-12-01`
      : `${YEAR}-${parseInt(MONTH) - 1}-01`;
  const lastMonthEnd =
    MONTH === "01"
      ? `${parseInt(YEAR) - 1}-12-31`
      : `${YEAR}-${parseInt(MONTH - 1)}-31`;

  try {
    const sql = `
        SELECT 
            v.vehicleRegNo AS regNo,
            v.org,
            v.serviceType AS service,
            IFNULL(SUM(CASE WHEN a.date >= ? AND a.date <= ? THEN a.rides ELSE 0 END), 0) AS currentRides,
            IFNULL(SUM(CASE WHEN a.date >= ? AND a.date <= ? THEN a.rides ELSE 0 END), 0) AS lastRides,
            IFNULL(SUM(CASE WHEN a.date >= ? AND a.date <= ? THEN a.bookings ELSE 0 END), 0) AS currentBookings,
            IFNULL(SUM(CASE WHEN a.date >= ? AND a.date <= ? THEN a.bookings ELSE 0 END), 0) AS lastBookings,
            IFNULL(SUM(CASE WHEN a.date >= ? AND a.date <= ? THEN a.refund ELSE 0 END), 0) AS currentCancel,
            IFNULL(SUM(CASE WHEN a.date >= ? AND a.date <= ? THEN a.refund ELSE 0 END), 0) AS lastCancel,
            IFNULL(SUM(CASE WHEN a.date >= ? AND a.date <= ? THEN a.receivedMoney ELSE 0 END), 0) AS currentRecieved,
            IFNULL(SUM(CASE WHEN a.date >= ? AND a.date <= ? THEN a.receivedMoney ELSE 0 END), 0) AS lastRecieved,
            IFNULL(SUM(CASE WHEN a.date >= ? AND a.date <= ? THEN a.refundMoney ELSE 0 END), 0) AS currentRefund,
            IFNULL(SUM(CASE WHEN a.date >= ? AND a.date <= ? THEN a.refundMoney ELSE 0 END), 0) AS lastRefund
        FROM
            VEHICLE v
        LEFT JOIN
            ACTIVITY a ON v.vehicleID = a.vehicleID
        WHERE
            v.vehicleID = ? ;
    `;

    const values = [
      // For currentRides
      currentMonthStart,
      currentMonthEnd,
      // For lastRides
      lastMonthStart,
      lastMonthEnd,

      // For currentBookings
      currentMonthStart,
      currentMonthEnd,
      // For lastBookings
      lastMonthStart,
      lastMonthEnd,

      // For currentCancel
      currentMonthStart,
      currentMonthEnd,
      // For lastCancel
      lastMonthStart,
      lastMonthEnd,

      // For currentRecieved
      currentMonthStart,
      currentMonthEnd,
      // For lastRecieved
      lastMonthStart,
      lastMonthEnd,

      // For currentRefund
      currentMonthStart,
      currentMonthEnd,
      // For lastRefund
      lastMonthStart,
      lastMonthEnd,

      busId, // Vehicle ID
    ];

    const [result] = await db.query(sql, values);

    if (result.length !== 1) {
      console.log("Bus not found!");
      throw createHttpError(404, "Bus not found!");
    }

    //console.log("Bus Data: ", result);

    const busData = {
      regNo: result[0].regNo,
      org: result[0].org,
      service: result[0].service,
      rides: {
        amount: result[0].currentRides,
        increment: findIncrement(result[0].currentRides, result[0].lastRides),
      },
      bookings: {
        amount: result[0].currentBookings,
        increment: findIncrement(
          result[0].currentBookings,
          result[0].lastBookings
        ),
      },
      cancel: {
        amount: result[0].currentCancel,
        increment: findIncrement(result[0].currentCancel, result[0].lastCancel),
      },
      earn: {
        amount: (result[0].currentRecieved - result[0].currentRefund).toFixed(
          2
        ),
        increment: findIncrement(
          result[0].currentRecieved - result[0].currentRefund,
          result[0].lastRecieved - result[0].lastRefund
        ),
      },
    };

    console.log("General Data: ", busData);
    res.json(busData);
  } catch (error) {
    console.log(error.message + "\n");
    next(createHttpError(503, "Database connection is failed!"));
  }
};

/* const sql = `
        SELECT 
            v.vehicleRegNo AS regNo,
            v.org,
            v.serviceType AS service,
            IFNULL(SUM(CASE WHEN a.date >= ? AND a.date <= ? THEN a.rides ELSE 0 END), 0) AS currentRides,
            IFNULL(SUM(CASE WHEN a.date >= ? AND a.date <= ? THEN a.rides ELSE 0 END), 0) AS lastRides,
            IFNULL(SUM(CASE WHEN a.date >= ? AND a.date <= ? THEN a.bookings ELSE 0 END), 0) AS currentBookings,
            IFNULL(SUM(CASE WHEN a.date >= ? AND a.date <= ? THEN a.bookings ELSE 0 END), 0) AS lastBookings,
            IFNULL(SUM(CASE WHEN a.date >= ? AND a.date <= ? THEN a.refund ELSE 0 END), 0) AS currentCancel,
            IFNULL(SUM(CASE WHEN a.date >= ? AND a.date <= ? THEN a.refund ELSE 0 END), 0) AS lastCancel,
            IFNULL(SUM(CASE WHEN a.date >= ? AND a.date <= ? THEN a.earning ELSE 0 END), 0) AS currentEarning,
            IFNULL(SUM(CASE WHEN a.date >= ? AND a.date <= ? THEN a.earning ELSE 0 END), 0) AS lastEarning
        FROM
            VEHICLE v
        JOIN
            ACTIVITY a ON v.vehicleID = a.vehicleID
        WHERE
            v.vehicleID = ? ;
    `; */
