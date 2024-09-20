/* User Logs endpoint */

import createHttpError from "http-errors";
import { db } from "../db.js";

export const userLogs = async (req, res, next) => {
  try {
    const { type, data } = req.body;
    console.log("\n\nUser Logs Endpoint:: type: ", type);

    // Check session Status (active or inactive) (Can use patch method)
    if (type === "Log1") {
      console.log(
        `Checking availabilty of user session:: Searching about ${data.userID} on ${data.session.MAC}/${data.session.browser}`
      );

      const checkSessionSql = `
            SELECT COUNT(*) AS count FROM USER_LOGS 
            WHERE userID = ? AND MAC = ? AND browser = ?;
        `;

      const updateSessionSql = `
            UPDATE USER_LOGS 
            SET IP = ?, date = ?, time = ?, country = ?
            WHERE userID = ? AND MAC = ? AND browser = ?;
        `;

      const values = [data.userID, data.session.MAC, data.session.browser];
      const updateValues = [
        data.session.IP,
        data.session.date,
        data.session.time,
        data.session.country,
        data.userID,
        data.session.MAC,
        data.session.browser,
      ];

      // Check if the session exists
      db.query(checkSessionSql, values, (err, result) => {
        if (err) {
          console.log(err.message);
          res.status(502).send("DB Error");
        } else {
          const sessionCount = result[0].count;
          if (sessionCount > 0) {
            // Session exists, update the row
            db.query(updateSessionSql, updateValues, (err, result) => {
              if (err) {
                console.log(err.message);
                res.status(502).send("DB Error");
              } else {
                res.status(202).json("active");
                console.log(
                  `Server replies as userID: ${data.userID} with status: active\n\n`
                );
              }
            });
          } else {
            // Session does not exist
            res.status(202).json("deactive");
            console.log(
              `Server replies as userID: ${data.userID} with status: deactive\n\n`
            );
          }
        }
      });
    }

    // Session terminate (can use delete method)
    else if (type === "Log2") {
      console.log(
        `Session Terminating:: Terminate user ${data.userID} on ${data.MAC}/${data.browser}`
      );

      const sql = `DELETE FROM USER_LOGS 
             WHERE userID = ? AND MAC = ? AND browser = ?`;

      const values = [data.userID, data.MAC, data.browser];

      db.query(sql, values, (err, result) => {
        //console.log(`Session is terminated successfully!\nuserID: ${JSON.parse(data.userID)} browser: ${data.browser} MAC:${data.MAC}`);
        if (err) {
          console.log(err.message + "\n\n");
          res.status(502).json("DB Error");
        } else {
          console.log("Entry deleted successfully!\n\n");
          res.status(201).json("success");
        }
      });
    }

    // Here you might want to save the user log to the db (request comming from login page) (can use post method)
    else if (type === "Log3") {
      console.log(
        `Adding User Log::  Successful login!  userId: ${JSON.stringify(data)}`
      );

      const sql = `
            INSERT INTO USER_LOGS (
                userID, device, OS, browser, MAC, IP, date, time, country
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                IP = VALUES(IP),
                date = VALUES(date),
                time = VALUES(time),
                country = VALUES(country)
        `;

      const values = [
        data.userID,
        data.sessionData.device,
        data.sessionData.OS,
        data.sessionData.browser,
        data.sessionData.MAC,
        data.sessionData.IP,
        data.sessionData.date,
        data.sessionData.time,
        data.sessionData.country,
      ];

      db.query(sql, values, (err, result) => {
        if (err) {
          console.log(err.message);
          res.status(502).send("DB Error");
        } else {
          console.log("Entry added or updated successfully!");
          res.status(202).json("success");
        }
      });
    }

    // Requesting device data from devices (can use get method)
    else if (type === "Log4") {
      console.log(`Requesting Device Data:: userID: ${data}`);

      const sql = `SELECT logID, device, MAC, OS, browser, country, date, time
           FROM USER_LOGS
           WHERE userID = ?`;

      db.query(sql, data, (err, result) => {
        if (err) {
          console.log(err.message + "\n\n");
          res.status(502).json("error");
        } else {
          console.log(
            `Entry searched successfully!\ndevices: ${JSON.stringify(
              result
            )}\n\n`
          );
          res.status(201).json(result);
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

export const addLogs = async (req, res, next) => {
  const data = req.body;
  console.log(`Adding New User Log::  ${JSON.stringify(data)}`);

  const sql = `
          INSERT INTO USER_LOGS (
              userID, device, OS, browser, MAC, IP, date, time, country
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

  const values = [
    data.userID,
    data.sessionData.device,
    data.sessionData.OS,
    data.sessionData.browser,
    data.sessionData.MAC,
    data.sessionData.IP,
    data.sessionData.date,
    data.sessionData.time,
    data.sessionData.country,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err.message);
      next(createHttpError(502, "Unable to add new userlog!"));
    } else {
      console.log("Entry added successfully!");
      res.status(201).json("success");
    }
  });
};

export const deleteLog = async (req, res, next) => {
  const data = req.body.data;
  console.log(
    `Session Terminating:: Terminate user ${data.userID} on ${data.MAC}/${data.browser}`
  );

  const sql = `DELETE FROM USER_LOGS 
         WHERE userID = ? AND MAC = ? AND browser = ?`;

  const values = [data.userID, data.MAC, data.browser];

  db.query(sql, values, (err, result) => {
    //console.log(`Session is terminated successfully!\nuserID: ${JSON.parse(data.userID)} browser: ${data.browser} MAC:${data.MAC}`);
    if (err) {
      console.log(err.message + "\n\n");
      next(createHttpError(502, "Delete request is failed!"));
    } else {
      console.log("Entry deleted successfully!\n\n");
      res.status(200).json("success");
    }
  });
};

export const updateLogs = async (req, res, next) => {
  const data = req.body;
  console.log(
    `Checking availabilty of user session:: Searching about ${data.userID} on ${data.session.MAC}/${data.session.browser}`
  );

  const checkSessionSql = `
        SELECT COUNT(*) AS count FROM USER_LOGS 
        WHERE userID = ? AND MAC = ? AND browser = ?;
    `;

  const updateSessionSql = `
        UPDATE USER_LOGS 
        SET IP = ?, date = ?, time = ?, country = ?
        WHERE userID = ? AND MAC = ? AND browser = ?;
    `;

  const values = [data.userID, data.session.MAC, data.session.browser];
  const updateValues = [
    data.session.IP,
    data.session.date,
    data.session.time,
    data.session.country,
    data.userID,
    data.session.MAC,
    data.session.browser,
  ];

  // Check if the session exists
  db.query(checkSessionSql, values, (err, result) => {
    if (err) {
      console.log(err.message);
      next(createHttpError(502, "Searching log is failed!"));
    } else {
      const sessionCount = result[0].count;
      if (sessionCount > 0) {
        // Session exists, update the row
        db.query(updateSessionSql, updateValues, (err, result) => {
          if (err) {
            console.log(err.message);
            next(createHttpError(502, "Session updating is failed!"));
          } else {
            res.status(201).json("active");
            console.log(
              `Server replies as userID: ${data.userID} with status: active\n\n`
            );
          }
        });
      } else {
        // Session does not exist
        res.status(202).json("deactive");
        console.log(
          `Server replies as userID: ${data.userID} with status: deactive\n\n`
        );
      }
    }
  });
};

export const getLogs = async (req, res, next) => {
  const data = req.query;
  console.log(`Requesting Device Data:: userID: ${data}`);

  const sql = `SELECT logID, device, MAC, OS, browser, country, date, time
           FROM USER_LOGS
           WHERE userID = ?`;

  db.query(sql, data, (err, result) => {
    if (err) {
      console.log(err.message + "\n\n");
      next(createHttpError(504, "Getting session data is failed!"));
    } else {
      console.log(
        `Entry searched successfully!\ndevices: ${JSON.stringify(result)}\n\n`
      );
      res.status(200).json(result);
    }
  });
};
