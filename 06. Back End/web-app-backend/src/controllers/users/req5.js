import createHttpError from "http-errors";
import { db } from "../../db.js";

// Get all personal details of the user
const Req5 = async (req, res, next) => {
  const { data } = req.body;
  console.log("\nREQ 5 :: Settings Page Request. User", data);

  const sql = `
            SELECT userID, userType, empType, fName, lName, email, mobile, nic, birthDay, ntc, licence, accName, accNo, bank, branch
            FROM USERS
            WHERE userID = ?;
            `;

  try {
    const [result] = await db.query(sql, [data]);

    if (result.length > 0) {
      console.log(
        `Entry searched successfully!\nUsers: ${JSON.stringify(result[0])}`
      );
      res.status(200).json(result[0]);
    } else {
      next(createHttpError(404, "Data not found"));
    }
  } catch (err) {
    console.error("Error executing query:", err.message);
    next(createHttpError(503, "Database connection failed!"));
  }
};

export default Req5;

/* db.query(sql, data, (err, result) => {
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
  }); */
