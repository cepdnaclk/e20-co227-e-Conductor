import createHttpError from "http-errors";
import { db } from "../../db.js";

// Get all personal details of the user
const Req5 = (req, res, next) => {
  const { data } = req.body;
  console.log("\nREQ 5 :: Settings Page Request. User", data);

  const sql = `
            SELECT userID, userType, empType, fName, lName, email, mobile, nic, birthDay, ntc, licence, accName, accNo, bank, branch
            FROM USERS
            WHERE userID = ?;
            `;

  db.query(sql, data, (err, result) => {
    if (err) {
      console.log(err.message + "\n\n");
      next(createHttpError(503, "Database connection is failed!"));
    } else {
      console.log(
        `Entry searched successfully!\nUsers: ${JSON.stringify(result[0])}`
      );
      if (result.length > 0) {
        res.status(200).json(result[0]);
      } else {
        next(createHttpError(404, "Data not found"));
      }
    }
  });
};

export default Req5;
