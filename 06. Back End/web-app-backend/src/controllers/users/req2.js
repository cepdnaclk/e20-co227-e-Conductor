import createHttpError from "http-errors";
import { db } from "../../db.js";

// Here you might want to find user availability from DB and send back to the frontend (request comming from signup page)
const Req2 = (req, res, next) => {
  const { data } = req.body;

  console.log("\nREQ 2:: New user availability checking.", data);

  const sql = `SELECT userID FROM USERS WHERE email = ? OR mobile = ?`;
  const values = [data.email, data.mobile];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err.message);
      next(createHttpError(503, "Database connection is failed!"));
    } else {
      console.log(
        `Entry searched successfully!\nUsers: ${JSON.stringify(result)}`
      );
      if (result.length > 0) {
        console.log("User is currently used");
        res.status(226).send("false");
      } else {
        console.log("User is available to use");
        res.status(200).send("true");
      }
    }
  });
};

export default Req2;
