import createHttpError from "http-errors";
import { db } from "../../db.js";

// Check availability of new data
const Req6 = (req, res, next) => {
  const { data } = req.body;

  console.log("\nREQ 6:: Checking availability of the user's new data.", data);

  const sql = `SELECT userID FROM USERS WHERE userID != ? AND (email = ? OR mobile = ? OR nic = ?)`;

  db.query(
    sql,
    [data.userID, data.email, data.mobile, data.nic],
    (err, result) => {
      if (err) {
        console.log(err.message + "\n\n");
        next(createHttpError(503, "Database connection1 is failed!"));
      } else {
        console.log(
          `Entry searched successfully!\nUsers: ${JSON.stringify(result)}`
        );
        if (result.length > 0) {
          console.log("User currently in use! Cannot procceed request!");
          res.status(226).send("invalid");
        } else {
          console.log("Details are available to use!");

          const sql2 = `SELECT email, mobile, nic FROM USERS WHERE userID = ?`;
          db.query(sql2, [data.userID], (err2, result2) => {
            if (err2) {
              console.log(err2.message + "\n\n");
              next(createHttpError(503, "Database connection2 is failed!"));
            } else {
              const { email, mobile } = result2[0]; // userID is unique
              console.log(
                `Current contact details:: email:${email}  mobile: ${mobile}`
              );

              // Email or mobile both are changed
              if (email !== data.email && data.mobile !== mobile) {
                console.log("Email or mobile both are changed");
                res.status(200).send("emailMobile");
              }

              // Email changed
              else if (email !== data.email) {
                console.log("Email has changed");
                res.status(200).send("email");
              }

              // Mobile changed
              else if (mobile !== data.mobile) {
                console.log("Mobile has changed");
                res.status(200).send("mobile");
              }

              // Both are remaining unchanged
              else {
                console.log("unchanged");
                res.status(200).send("noChange");
              }
            }
          });
        }
      }
    }
  );
};

export default Req6;
