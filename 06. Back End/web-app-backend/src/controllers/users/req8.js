import createHttpError from "http-errors";
import { db } from "../../db.js";

// Request personal infomation from booking page
const Req8 = (req, res, next) => {
  const { data } = req.body;
  console.log("\nREQ 8:: Booking page user data request. userID: ", data);

  const sql = `SELECT CONCAT(fName, ' ', lName) AS name, mobile, email 
                  FROM USERS 
                  WHERE UserID = ? AND userState != 'banned' ;
                `;

  db.query(sql, data, (err, result) => {
    if (err) {
      console.log(err.message);
      next(createHttpError(503, "Database connection is failed!"));
    } else {
      if (result.length > 0) {
        console.log("User Data:", result[0]);
        res.status(200).json(result[0]);
      } else {
        next(createHttpError(404, "User not found!"));
      }
    }
  });
};

export default Req8;
