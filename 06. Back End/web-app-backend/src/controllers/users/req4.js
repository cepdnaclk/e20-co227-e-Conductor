import createHttpError from "http-errors";
import { db } from "../../db.js";

// Get data for the general page
const Req4 = (req, res, next) => {
  const { data } = req.body;

  console.log("\nREQ 4:: General Page Request", data);

  // Query the database for user data
  const query = ` SELECT 
              CONCAT(u.fName, ' ', u.lName) AS name,
              u.UserType,
              u.mobile,
              u.email,
              u.credits,
              COUNT(CASE WHEN t.status = 'Available' THEN t.ticketNo END) AS tickets,
              COUNT(CASE WHEN t.status = 'Used' THEN t.ticketNo END) AS rides
            FROM USERS u
            LEFT JOIN TICKET t ON t.passengerID = u.userID
            WHERE u.UserID = ?
            GROUP BY u.fName, u.lName, u.UserType, u.mobile, u.email, u.credits
          `;

  db.query(query, [data], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      next(createHttpError(503, "Database connection is failed!"));
    }

    if (results.length > 0) {
      const userData = results[0];
      console.log(`Server Replies to ${data} as ${JSON.stringify(userData)}`);
      res.status(200).json(userData);
    } else {
      console.log(`No user found with ID: ${data}`);
      next(createHttpError(404, "User not found!"));
    }
  });
};

export default Req4;
