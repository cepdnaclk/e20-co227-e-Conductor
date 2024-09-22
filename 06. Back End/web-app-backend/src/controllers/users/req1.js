import createHttpError from "http-errors";
import { db } from "../../db.js";

// Here you might want to find userID, email userType, empType from DB and send back to the frontend (request comming from login page)
const Req1 = (req, res, next) => {
  const { data } = req.body;

  console.log("\nREQ 1 :: Finding primary data of user, Mobile Number:", data);
  const sql = `SELECT userID, userType, empType, email 
               FROM USERS
               WHERE mobile = ? AND userState != 'banned' `;

  db.query(sql, data, (err, result) => {
    if (err) {
      next(createHttpError(503, "Database connection is failed!"));
      console.log(err.message);
    } else {
      console.log(
        `Entry searched successfully!\nUsers: ${JSON.stringify(result)}`
      );
      if (result.length > 0) {
        const userData = result[0];
        console.log(
          `User is available. ID: ${userData.userID}  email: ${userData.email}`
        );
        res.status(200).json(userData);
      } else {
        console.log("No user.");
        res.status(204).send("invalid");
      }
    }
  });
};

export default Req1;
