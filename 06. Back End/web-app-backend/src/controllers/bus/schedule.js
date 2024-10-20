import createHttpError from "http-errors";
import { db } from "../../db.js";
import { journeyDetails } from "../../utils/journey_details.js";

/* Status Types: 
      1. completed - Ride is already completed
      2. active    - Ride is currently at active state
      3. cancel    - Ride is canceled and refunded all tickets 
      4. replace   - Ride is replced with another bus (linkedBus indicates the second busID)
      5. pending   - Ride is awaiting confirmation from second bus (linkedBus indicates the second busID)
*/

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
            CONCAT(e.lat, ", ", e.lng) AS endLocation,
            o.vehicleRegNo AS originalBus,
            l.vehicleRegNo AS linkedBus,
            s.linkedBus AS linkedBusID,
            CONCAT(u.fName, " ", u.lName) AS originalOwner
        FROM 
            SCHEDULE s
        JOIN
            ROUTE r ON r.routeID = s.routeID
        JOIN
            BUSSTOP_LOCATIONS f ON s.startLocation = f.locationID
        JOIN
            BUSSTOP_LOCATIONS e ON s.endLocation = e.locationID
        JOIN
            VEHICLE o ON o.vehicleID = s.vehicleID
        LEFT JOIN
            VEHICLE l ON l.vehicleID = s.linkedBus
        JOIN 
            USERS u ON o.ownerID = u.userID
        WHERE
            s.date = ? AND (s.vehicleID = ? OR s.linkedBus = ?)
    `;
    const values = [formattedDate, busId, busId];

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

        let scheduleElement = {
          id: schedule.id,
          passengers: schedule.passengers,
          departure: schedule.departure,
          arrival: schedule.arrival,
          route: schedule.route,
          distance: journey.distance.toFixed(1),
          duration: journey.duration,
          routeType: schedule.routeType,
        };

        // Shared Schedule
        if (schedule.linkedBusID == busId) {
          switch (schedule.status) {
            case "pending": {
              scheduleElement = {
                ...scheduleElement,
                status: "awaiting",
                other: {
                  name: schedule.originalOwner,
                  vehiNum: schedule.linkedBus,
                },
              };
              break;
            }

            case "replace": {
              scheduleElement = {
                ...scheduleElement,
                status: "extra",
                linkedVehiNum: schedule.originalBus,
              };
              break;
            }

            default: {
              console.log("Invalid state");
              throw createHttpError(400, "Bad State!");
            }
          }
        }

        // Owned Schedule
        else {
          scheduleElement = {
            ...scheduleElement,
            status: schedule.status,
          };

          if (schedule.status === "replace" || schedule.status === "pending") {
            scheduleElement = {
              ...scheduleElement,
              linkedVehiNum: schedule.linkedBus,
            };
          }
        }

        return scheduleElement;
      })
    );

    console.log("Schedule List: ", scheduleList);
    res.status(200).json(scheduleList);
  } catch (error) {
    console.log(error.message + "\n");
    next(createHttpError(503, "Database connection is failed!"));
  }
};

/* Action Types:
      1. replace
      2. cancel
      3. reactivate
      4. confirm
      5. reject
*/

export const updateSchedule = async (req, res, next) => {
  const { scheduleID, action, other } = req.body;
  console.log("\nUpdating bus schedule data: ", req.body);

  // Transaction Actions
  if (action === "cancel" || action === "Accept") {
    let connection;

    /* COMMON STEPS */
    try {
      // Step 0: Get a connection and begin a transaction
      connection = await db.getConnection();
      await connection.beginTransaction();

      // Step 1: Finding the owner share for the schedule
      const sql1 = `
          SELECT 
              IFNULL(SUM(t.discount + t.ticketPrice), 0) AS totalAmount,
              COUNT(t.ticketNo) AS bookings,
              (SELECT g.value FROM GENERAL g WHERE g.item = 'companyShare') AS companyShare
          FROM 
              TICKET t
          WHERE 
              t.scheduleID = ? AND t.status = "Available";
      `;
      const [result1] = await connection.query(sql1, scheduleID);
      if (result1.length === 0) {
        console.log("Tickets not found!");
        throw createHttpError(404, "Tickets not found");
      }

      console.log("Result1: ", result1[0]);
      const { totalAmount, bookings, companyShare } = result1[0];
      const transferAmount = (
        totalAmount *
        (100 - companyShare) *
        0.01
      ).toFixed(2);

      console.log("Transfer Amount: ", transferAmount);

      // Step 2: Find schedule details
      const sql2 = `
          SELECT
              s.date,
              s.vehicleID AS actualBus,
              s.linkedBus,
              av.ownerID AS actualOwner,
              lv.ownerID AS linkedOwner
          FROM
              SCHEDULE s
          JOIN 
              VEHICLE av ON av.vehicleID = s.vehicleID
          LEFT JOIN
              VEHICLE lv ON lv.vehicleID = s.linkedBus
          WHERE 
              s.scheduleID = ? AND (s.status = "pending" OR s.status = "active");
      `;

      const [result2] = await connection.query(sql2, [scheduleID]);

      console.log("Result 2: ", result2[0]);
      const { date, actualBus, actualOwner, linkedBus, linkedOwner } =
        result2[0];

      const insertTransaction = `
          INSERT INTO TRANSACTION (userID, amount, date, time, type) 
          VALUES (?, ?, ?, ? ,?)
      `;

      // ACCEPT ACTION
      if (action === "Accept") {
        // Step 3: Update actual owner
        const sql3 = `
          UPDATE ACTIVITY a
          JOIN USERS u ON u.userID = ?
          SET 
              a.replaced = a.replaced + 1,
              a.bookings = a.bookings - ?,
              a.receivedMoney = a.receivedMoney - ?,
              u.credits = u.credits - ?
          WHERE 
              a.vehicleID = ? AND a.date = ?;              
        `;

        await connection.query(sql3, [
          actualOwner,
          bookings,
          transferAmount,
          transferAmount,
          actualBus,
          date,
        ]);

        // Step 4: Add new transaction
        await connection.query(insertTransaction, [
          actualOwner,
          transferAmount,
          other.date,
          other.time,
          "Debit",
        ]);

        // Step 5: Find availability of linked activity
        const [result4] = await connection.query(
          `SELECT activityID FROM ACTIVITY WHERE vehicleID = ? AND date = ?`,
          [linkedBus, date]
        );

        // Step 6: Update linked owner
        if (result4.length === 0) {
          console.log("New activity is added!");
          const add = `
              INSERT INTO ACTIVITY (
                  vehicleID, 
                  ownerID, 
                  date, 
                  rides, 
                  canceled, 
                  replaced, 
                  bookings, 
                  refund, 
                  receivedMoney, 
                  refundMoney
              ) 
              VALUES (?, ?, ?, 0, 0, 0, ?, 0, ?, 0);
          `;

          const newVal = [
            linkedBus,
            linkedOwner,
            date,
            bookings,
            transferAmount,
          ];

          await connection.query(add, newVal);

          await connection.query(
            `UPDATE USERS SET credits = credits + ? WHERE userID = ?`,
            [transferAmount, linkedOwner]
          );
        } else {
          const sql5 = `
              UPDATE ACTIVITY a
              JOIN USERS u ON u.userID = ?
              SET 
                  a.bookings = a.bookings + ?,
                  a.receivedMoney = a.receivedMoney + ?,
                  u.credits = u.credits + ?
              WHERE 
                  a.activityID = ?;
            `;

          await connection.query(sql5, [
            actualOwner,
            bookings,
            transferAmount,
            transferAmount,
            result4[0].activityID,
          ]);
        }

        // Step 7: Add new transaction
        await connection.query(insertTransaction, [
          linkedOwner,
          transferAmount,
          other.date,
          other.time,
          "Credit",
        ]);

        // Step 8: Update schedule
        await connection.query(
          `UPDATE SCHEDULE SET status = "replace" WHERE scheduleID = ?`,
          [scheduleID]
        );
      }

      // CANCEL ACTION
      else {
        // Step 3: Finding all tickets to be refunded
        const [result3] = await connection.query(
          `SELECT ticketNo, passengerID, ticketPrice, discount FROM TICKET WHERE scheduleID = ? AND status = "Available"`,
          [scheduleID]
        );

        console.log("Refund Tickets: ", result3);

        // Step 4: Debit from owner
        const sql4 = `
              UPDATE ACTIVITY a
              JOIN USERS u ON u.userID = ?
              SET 
                  a.canceled = a.canceled + 1,
                  a.refund = a.refund + ?,
                  a.refundMoney = a.refundMoney + ?,
                  u.credits = u.credits - ?
              WHERE 
                  a.vehicleID = ? AND a.date = ?;
            `;

        await connection.query(sql4, [
          actualOwner,
          bookings,
          transferAmount,
          transferAmount,
          actualBus,
          date,
        ]);

        console.log("Amount is debited");

        // Step 5: Add new transaction
        await connection.query(insertTransaction, [
          actualOwner,
          transferAmount,
          other.date,
          other.time,
          "Debit",
        ]);

        // Step 6: Refunding all tickets
        const sql6 = `
            UPDATE TICKET t
            JOIN USERS u ON u.userID = ?
            SET
                t.status = "Refunded",
                u.credits = u.credits + ?
            WHERE
                t.ticketNo = ?;
        `;
        for (const ticket of result3) {
          const { ticketNo, passengerID, ticketPrice, discount } = ticket;

          const refundAmount = (
            (ticketPrice + discount) * (100 - companyShare) * 0.01 -
            discount
          ).toFixed(2);

          await connection.query(sql6, [passengerID, refundAmount, ticketNo]);

          console.log("Refunded to ", passengerID);

          // Step 7: Add transaction
          await connection.query(insertTransaction, [
            passengerID,
            refundAmount,
            other.date,
            other.time,
            "Refund",
          ]);
          console.log("Transaction is completed!");
        }
      }

      // Step 8: Commit the transaction
      await connection.commit();
      console.log("Refund Completed!");
      res.status(200).send("success");
    } catch (error) {
      if (connection) {
        await connection.rollback(); // Roll back any changes if error occurs
      }
      next(error); // Pass the error to the Express error handl
    } finally {
      if (connection) {
        connection.release(); // Release the connection back to the pool
      }
    }
  }

  // General Actions
  else {
    try {
      let sql, values;

      switch (action) {
        case "replace": {
          sql = `
          UPDATE SCHEDULE s
          JOIN VEHICLE v ON v.vehicleRegNo = ? AND v.status = 'active'
          SET 
              s.status = 'pending',
              s.linkedBus = v.vehicleID
          WHERE 
              s.scheduleID = ? AND s.status = 'active';
      `;

          values = [other, scheduleID];
          break;
        }

        case "reactivate": {
          sql = `
          UPDATE SCHEDULE
          SET 
              status = 'active',
              linkedBus = NULL
          WHERE 
              scheduleID = ? AND status = 'pending';
      `;

          values = [scheduleID];
          break;
        }

        case "Reject": {
          sql = `
          UPDATE SCHEDULE
          SET 
              status = 'active',
              linkedBus = NULL
          WHERE 
              scheduleID = ? AND status = 'pending';
      `;

          values = [scheduleID];
          break;
        }

        default: {
          console.log("Bad Request");
          throw createHttpError(400, "Bad Request!");
        }
      }

      const [results] = await db.query(sql, values);
      console.log(results);

      if (results.affectedRows === 0) {
        console.log("Update Failed!");
        throw createHttpError(404, "Schedule not found!");
      }

      console.log("Update successfully!");
      res.status(200).send("success");
    } catch (error) {
      console.log(error.message + "\n");
      next(createHttpError(503, "Database connection is failed!"));
    }
  }
};

/* case "Accept": {
          
          break;
        } */
