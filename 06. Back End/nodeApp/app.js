// Import mac module
import macaddress from "macaddress";

//import otp functions
import { generateOTP, sendOTP } from "./otp.js";

// Express connection
import express, { response } from "express";
export const app = express();

// DB connection
//const db = require('./localdb');   // Local db
import { db } from "./db.js";

// CORS Policy
import cors from "cors";

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// Test backend connection
app.get("/hello", (req, res) => {
  const msg = "Hello I'm Node App!";
  console.log(msg);
  res.json(msg);
});

// DB Controls
app.get("/test", (req, res) => {
  console.log(`Testing`);

  const sql = `
    DESCRIBE USERS
    `;

  /*
    DESCRIBE userlogs
    
    ALTER TABLE userlogs
    MODIFY COLUMN date VARCHAR(20)

    CREATE TABLE userlogs (
    logID INT AUTO_INCREMENT NOT NULL UNIQUE,
    userID INT NOT NULL,
    mobile VARCHAR(11) NOT NULL,
    email VARCHAR(50) NOT NULL,
    device VARCHAR(10) NOT NULL,
    OS VARCHAR(15) NOT NULL,
    browser VARCHAR(15) NOT NULL,
    MAC VARCHAR(18) NOT NULL,
    IP VARCHAR(40) NOT NULL,
    date VARCHAR(20) NOT NULL,
    time VARCHAR(15) NOT NULL,
    country VARCHAR(20) NOT NULL,
    longitude FLOAT NOT NULL,
    latitude FLOAT NOT NULL,
    PRIMARY KEY (userID, MAC, browser) 
  */

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      res.json(result);
    }
  });
});

// Queries

// Getting MAC address
app.post("/mac", (req, res) => {
  macaddress.one((err, mac) => {
    if (err) {
      console.log(err);
      res.json("error");
    } else {
      console.log(`mac: ${mac}`);
      res.json(mac);
    }
  });
});

// Related to userLogs table
app.post("/logs/users", (req, res) => {
  const { type, data } = req.body;

  // Check session Status (active or inactive)
  if (type === "Log1") {
    console.log(
      `New Request::  type: ${type}    Searching about ${data.userID} on ${data.session.MAC}/${data.session.browser}`
    );

    const checkSessionSql = `
          SELECT COUNT(*) AS count FROM userlogs 
          WHERE userID = ? AND MAC = ? AND browser = ?;
      `;

    const updateSessionSql = `
          UPDATE userlogs 
          SET IP = ?, date = ?, time = ?, country = ?, longitude = ?, latitude = ?
          WHERE userID = ? AND MAC = ? AND browser = ?;
      `;

    const values = [data.userID, data.session.MAC, data.session.browser];
    const updateValues = [
      data.session.IP,
      data.session.date,
      data.session.time,
      data.session.country,
      data.session.longitude,
      data.session.latitude,
      data.userID,
      data.session.MAC,
      data.session.browser,
    ];

    // Check if the session exists
    db.query(checkSessionSql, values, (err, result) => {
      if (err) {
        console.log(err.message);
        res.json("error");
      } else {
        const sessionCount = result[0].count;
        if (sessionCount > 0) {
          // Session exists, update the row
          db.query(updateSessionSql, updateValues, (err, result) => {
            if (err) {
              console.log(err.message);
              res.json("error");
            } else {
              res.json("active");
              console.log(
                `Server replies as userID: ${data.userID} with status: active\n\n`
              );
            }
          });
        } else {
          // Session does not exist
          res.json("deactive");
          console.log(
            `Server replies as userID: ${data.userID} with status: deactive\n\n`
          );
        }
      }
    });
  }

  // Session terminate
  else if (type === "Log2") {
    console.log(
      `New Request::  type: ${type}    Terminate user ${data.userID} on ${data.MAC}/${data.browser}`
    );

    const sql = `DELETE FROM userlogs 
           WHERE userID = ? AND MAC = ? AND browser = ?`;

    const values = [data.userID, data.MAC, data.browser];

    db.query(sql, values, (err, result) => {
      //console.log(`Session is terminated successfully!\nuserID: ${JSON.parse(data.userID)} browser: ${data.browser} MAC:${data.MAC}`);
      if (err) {
        console.log(err.message + "\n\n");
        res.json("error");
      } else {
        console.log("Entry deleted successfully!\n\n");
        res.json("success");
      }
    });
  }

  // Here you might want to save the user log to the db (request comming from login page)
  else if (type === "Log3") {
    console.log(
      `New Request::  type: ${type}    \nSuccessful login!  userId: ${JSON.stringify(
        data
      )}`
    );
    const sql = `
          INSERT INTO userlogs (
              userID, mobile, email, device, OS, browser, MAC, IP, date, time, country, longitude, latitude
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
              IP = VALUES(IP),
              date = VALUES(date),
              time = VALUES(time),
              country = VALUES(country),
              longitude = VALUES(longitude),
              latitude = VALUES(latitude);
      `;

    const values = [
      data.userID,
      data.mobile,
      data.email,
      data.sessionData.device,
      data.sessionData.OS,
      data.sessionData.browser,
      data.sessionData.MAC,
      data.sessionData.IP,
      data.sessionData.date,
      data.sessionData.time,
      data.sessionData.country,
      data.sessionData.longitude,
      data.sessionData.latitude,
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log("Entry added or updated successfully!");
        res.json("success");
      }
    });
  }

  // Requesting device data from devises
  else if (type === "Log4") {
    console.log(`Type: ${type}   userID: ${data}`);

    const sql = `SELECT logID, device, MAC, OS, browser, country, date, time
           FROM userlogs
           WHERE userID = ?`;

    db.query(sql, data, (err, result) => {
      if (err) {
        console.log(err.message + "\n\n");
        res.json("error");
      } else {
        console.log(
          `Entry searched successfully!\ndevices: ${JSON.stringify(result)}\n\n`
        );
        res.json(result);
      }
    });
  }
});

// Related to OTP handling
app.post("/OTP", (req, res) => {
  const { type, data } = req.body;

  // Here you might want to generate an OTP and save it
  if (type === "loginOTP" || type === "signupOTP" || type === "request") {
    let loginOTP = generateOTP();
    sendOTP(data.email, loginOTP);
    console.log(
      `New Request::  type: ${type}    Mobile Number: ${data.mobile}   Email: ${data.email}\n   OTP:: ${loginOTP}\n\n`
    );

    const check_sql = `SELECT otpID FROM otp_table WHERE contactNo = ?`;

    db.query(check_sql, data.mobile, (err, result) => {
      if (result.length > 0) {
        const update_otp_sql = `UPDATE otp_table SET otp = ? WHERE contactNo = ?`;
        const values = [loginOTP, data.mobile];

        db.query(update_otp_sql, values, (err) => {
          err ? console.log(err) : res.send(`success`);
        });
      } else {
        const new_entry_sql = `INSERT INTO otp_table (otp, contactNo, email) VALUES (?)`;
        const values = [loginOTP, data.mobile, data.email];

        db.query(new_entry_sql, [values], (err) => {
          err ? console.log(err) : res.send(`success`);
        });
      }
    });
    // Send reply to frontend saying request is success
  } else if (type === "verify") {
    const email = data.email;
    const sql = `SELECT otp FROM otp_table WHERE email = ? limit 1`;

    db.query(sql, email, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        //console.log(`ServerOTP:${response[0].otp} | UserOTP:${data.value}`);
        const reply = (data.value === response[0].otp) ? "true" : "false";
        res.send(reply);
      }
    });
    console.log(
      `Authentication::  type: ${type}  Data: ${JSON.stringify(
        data
      )}  User OTP: ${data.value}\n\n`
    );    
  }
});

// Related to users table
app.post("/users", (req, res) => {
  const { type, data } = req.body;

  // Here you might want to find userID, email userType, empType from DB and send back to the frontend (request comming from login page)
  if (type === "Req1") {
    console.log(`New Request::  type: ${type}    Mobile Number: ${data}`);

    var userData = {};

    const sql = `SELECT userID, userType, empType, email 
             FROM users
             WHERE mobile = ?`;

    db.query(sql, data, (err, result) => {
      if (err) {
        console.log(err.message + "\n\n");
        userData.userID = "error";
        userData.userType = "error";
        userData.empType = "error";
        userData.email = "error";
        res.json(userData); // Reply with 'error' in case of an error
      } else {
        console.log(
          `Entry searched successfully!\nUsers: ${JSON.stringify(result)}`
        );
        if (result.length > 0) {
          userData = result[0];
        } else {
          userData.userID = "invalid";
          userData.email = "invalid";
          userData.userType = "invalid";
          userData.empType = "invalid";
        }
        console.log(
          `Server replies as userID: ${userData.userID} with email: ${userData.email}\n\n`
        );
        res.json(userData);
      }
    });
  }

  // Here you might want to find user availability from DB and send back to the frontend (request comming from signup page)
  else if (type === "Req2") {
    console.log(
      `New Request::  type: ${type}        Mobile Number: ${data.mobile}   Email: ${data.email}`
    );
    var userAvailability = "none";

    const sql = `SELECT userID FROM users WHERE email = ? OR mobile = ?`;
    const values = [data.email, data.mobile];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.log(err.message + "\n\n");
        res.json(userAvailability); // Reply with 'none' in case of an error
      } else {
        console.log(
          `Entry searched successfully!\nUsers: ${JSON.stringify(result)}`
        );
        if (result.length > 0) {
          userAvailability = "false";
        } else {
          userAvailability = "true";
        }
        console.log(
          `Server replies as userAvailability: ${userAvailability}\n\n`
        );
        res.json(userAvailability);
      }
    });
  }

  // Save registed data into db
  else if (type === "Req3") {
    let sql = "";
    let values = [];
    switch (data.userType) {
      case "passenger": {
        // Query for passenger
        sql = `INSERT INTO users (userType, empType, fName, lName, email, mobile, credits)
           VALUES (?)`;
        values = [
          data.userType,
          data.empType,
          data.fName,
          data.lName,
          data.email,
          data.mobile,
          0,
        ];
        break;
      }
      case "employee": {
        // Query for employee
        sql = `INSERT INTO users (userType, empType, fName, lName, email, mobile, nic, birthDay, ntc, licence, credits)
           VALUES (?)`;
        values = [
          data.userType,
          data.empType,
          data.fName,
          data.lName,
          data.email,
          data.mobile,
          data.nic,
          data.birthDay,
          data.ntc,
          data.licence,
          0,
        ];
        break;
      }
      case "owner": {
        if (data.empType !== "None") {
          // Query for owner does not work as an employee
          sql = `INSERT INTO users (userType, empType, fName, lName, email, mobile, nic, birthDay, ntc, licence, accName, accNo, bank, branch, credits)
             VALUES (?)`;
          values = [
            data.userType,
            data.empType,
            data.fName,
            data.lName,
            data.email,
            data.mobile,
            data.nic,
            data.birthDay,
            data.ntc,
            data.licence,
            data.accName,
            data.accNo,
            data.bank,
            data.branch,
            0,
          ];
        } else {
          // Query for owner work as an employee
          sql = `INSERT INTO users (userType, empType, fName, lName, email, mobile, nic, birthDay, accName, accNo, bank, branch, credits)
             VALUES (?)`;
          values = [
            data.userType,
            data.empType,
            data.fName,
            data.lName,
            data.email,
            data.mobile,
            data.nic,
            data.birthDay,
            data.accName,
            data.accNo,
            data.bank,
            data.branch,
            0,
          ];
        }
        break;
      }
      default:
        break;
    }
    db.query(sql, [values], (err, result) => {
      if (err) {
        console.log(err.message + "\n\n");
        return res.json("error");
      } else {
        console.log("Entry added successfully!\n\n");
        return res.json("success");
      }
    });
  }

  // Get data for the general page
  else if (type === "Req4") {
    console.log(
      `New Request (General Page) ::  type: ${type}        UserID: ${data}`
    );

    // Query the database for user data
    const query = ` SELECT 
              CONCAT(u.fName, ' ', u.lName) AS name,
              u.userType,
              u.mobile,
              u.email,
              u.credits,
              COUNT(CASE WHEN t.Status = 'Available' THEN t.ticketNo END) AS tickets,
              COUNT(CASE WHEN t.Status = 'Used' THEN t.ticketNo END) AS rides
            FROM users u
            LEFT JOIN ticket t ON t.userID = u.userID
            WHERE u.userID = ?
            GROUP BY u.fName, u.lName, u.userType, u.mobile, u.email, u.credits
          `;

    db.query(query, [data], (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).send("Database query error");
      }

      if (results.length > 0) {
        const userData = results[0];
        console.log(`Server Replies to ${data} as ${JSON.stringify(userData)}`);
        return res.json(userData);
      } else {
        console.log(`No user found with ID: ${data}`);
        return res.status(404).send("User not found");
      }
    });
  }

  // Get all personal details of the user
  else if (type === "Req5") {
    console.log(
      `New Request (Settings Page) ::  type: ${type} \nUser ${data} is requested his infomation.`
    );

    const sql = `
            SELECT userID, userType, empType, fName, lName, email, mobile, nic, birthDay, ntc, licence, accName, accNo, bank, branch
            FROM users
            WHERE userID = ?;
            `;

    db.query(sql, data, (err, result) => {
      if (err) {
        console.log(err.message + "\n\n");
        return res.json("error"); // Reply with 'error' in case of an error
      } else {
        console.log(
          `Entry searched successfully!\nUsers: ${JSON.stringify(result[0])}`
        );
        if (result.length > 0) {
          return res.json(result[0]);
        } else {
          return res.json("invalid");
        }
      }
    });
  }

  // Check availability of new data
  else if (type === "Req6") {
    console.log(
      `New Request (Settings Page) ::  type: ${type} \nChecking Availability:: ${JSON.stringify(
        data
      )}`
    );

    const sql = `SELECT userID FROM users WHERE userID != ? AND (email = ? OR mobile = ? OR nic = ?)`;
    db.query(
      sql,
      [data.userID, data.email, data.mobile, data.nic],
      (err, result) => {
        if (err) {
          console.log(err.message + "\n\n");
          return res.json("error"); // Reply with 'error' in case of an error
        } else {
          console.log(
            `Entry searched successfully!\nUsers: ${JSON.stringify(result)}`
          );
          if (result.length > 0) {
            console.log("ServerResponse: invalid");
            return res.json("invalid");
          } else {
            const sql2 = `SELECT email, mobile, nic FROM users WHERE userID = ?`;
            db.query(sql2, [data.userID], (err2, result2) => {
              if (err2) {
                console.log(err2.message + "\n\n");
                return res.json("inner error");
              } else {
                const user = result2[0]; // userID is unique
                if (data.email !== user.email && data.mobile !== user.mobile) {
                  console.log("ServerResponse: emailMobile");
                  return res.json("emailmobile");
                } else if (data.email !== user.email) {
                  console.log("ServerResponse: email");
                  return res.json("email");
                } else if (data.mobile !== user.mobile) {
                  console.log("ServerResponse: mobile");
                  return res.json("mobile");
                } else {
                  const sql3 = `UPDATE users SET userType=?, empType=?, fName=?, lName=?,
                  email=?, mobile=?, nic=?, birthDay=?, ntc=?, licence=?, accName=?, accNo=?, 
                  bank=?, branch=? WHERE userID=?`;
                  const updateData = [
                    data.userType,
                    data.empType,
                    data.fName,
                    data.lName,
                    data.email,
                    data.mobile,
                    data.nic,
                    data.birthDay,
                    data.ntc,
                    data.licence,
                    data.accName,
                    data.accNo,
                    data.bank,
                    data.branch,
                    data.userID,
                  ];

                  db.query(sql3, updateData, (err3, result3) => {
                    if (err3) {
                      console.log(err3.message + "\n\n");
                      return res.json("update error"); // Reply with 'update error' in case of an error
                    } else {
                      console.log("ServerResponse: success");
                      return res.json("success");
                    }
                  });
                }
              }
            });
          }
        }
      }
    );
  }

  // Update db with userData, after verification in settings page
  else if (type === "Req7") {
    const sql = `UPDATE users SET userType=?, empType=?, fName=?, lName=?, email=?, mobile=?, nic=?, birthDay=?, ntc=?, licence=?, accName=?, accNo=?, 
                    bank=?, branch=? WHERE userID=?`;

    const updateData = [
      data.userType,
      data.empType,
      data.fName,
      data.lName,
      data.email,
      data.mobile,
      data.nic,
      data.birthDay,
      data.ntc,
      data.licence,
      data.accName,
      data.accNo,
      data.bank,
      data.branch,
      data.userID,
    ];

    db.query(sql, updateData, (err, result) => {
      if (err) {
        console.log(err.message + "\n\n");
        return res.json("update error"); // Reply with 'update error' in case of an error
      } else {
        console.log("ServerResponse: success");
        return res.json("success");
      }
    });
  } else {
    console.log(`Invalid request type: ${type}`);
    return res.status(400).send("Invalid request type");
  }
});

// Related to transaction table
app.post("/transactions", (req, res) => {
  const { type, data } = req.body;

  // Requesting transaction history from db
  if (type === "Trans1") {
    console.log(`Transaction Request:: type: ${type}  userID: ${data}`);
    // Edit here with suitable query
    const query = `
        SELECT 
          JSON_OBJECT(
              'credits', u.credits,
              'transaction', JSON_ARRAYAGG(
                  JSON_OBJECT(
                      'id', LPAD(t.transID, 7, '0'),
                      'date', t.date,
                      'time', t.time,
                      'description', t.description,
                      'amount', t.amount
                  )
              )
          ) AS result
        FROM 
            users u
        LEFT JOIN 
            transaction t ON u.userID = t.userID
        WHERE 
            u.userID = ?
        GROUP BY 
            u.userID, u.credits;
        `;

    db.query(query, data, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).send("Database query error");
      }

      if (results.length > 0) {
        console.log(
          `Server Replies to ${data} as ${JSON.stringify(results[0].result)}`
        );
        return res.json(results[0].result);
      } else {
        console.log(`Transaction not found with ID: ${data}`);
        return res.status(404).send("Transaction not found");
      }
    });
  }
});

// Related to ticket table
app.post("/tickets", (req, res) => {
  const { type, data } = req.body;

  // Requesting ticket history from db
  if (type === "Tkt1") {
    console.log(`Ticket Request:: type:${type}  userID: ${data}`);

    // Edit here with suitable query
    const query = `
        SELECT 
          JSON_OBJECT(
              'available', (
                  SELECT COUNT(*)
                  FROM ticket t2
                  WHERE t2.userID = t1.userID AND t2.Status = 'Available'
              ),
              'tickets', JSON_ARRAYAGG(
                  JSON_OBJECT(
                      'id', LPAD(ticketNo, 7, '0'),
                      'date', date,
                      'from', fromLocatoin,
                      'to', toLocatoin,
                      'status', Status,
                      'amount', Price
                  )
              )
          ) AS result
        FROM ticket t1
        WHERE userID = ?
        GROUP BY userID;
      `;

    db.query(query, data, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).send("Database query error");
      }
      const count = results.length;
      console.log(`Tickect count: ${count}`);
      if (count > 0) {
        console.log(`Server Replies to ${data} as ${JSON.stringify(results)}`);
        return res.json(results[0].result);
      } else if (count === 0) {
        const serverResponse = {
          available: "0",
          tickets: results,
        };
        console.log(
          `Server Replies to ${data} as ${JSON.stringify(serverResponse)}`
        );
        return res.json(serverResponse);
      } else {
        console.log(`Tickets not found belongs to userID: ${data}`);
        return res.status(404).send("Tickets Error");
      }
    });
  }

  // Requesting specific ticket
  else if (type === "Tkt2") {
    console.log(`Invoice Request:: type: ${type}  Ref.No.: ${data}`);
    const query = `
      SELECT 
        JSON_OBJECT(
          'ticketNo', LPAD(t.ticketNo, 7, '0'),
          'customerName', CONCAT(u.fName, ' ', u.lName),
          'customerEmail', u.email,
          'customerMobile', u.mobile,
          'issuedDate', t.issuedDate,
          'issuedTime', t.issuedTime,
          'vehicalNo', t.Vehicle_No,
          'type', t.Type,
          'routeNo', t.Route_No,
          'route', t.Route,
          'date', t.date,
          'time', t.time,
          'from', t.fromLocatoin,
          'to', t.toLocatoin,
          'journey', t.Journey,
          'price', t.Price,
          'full', t.full,
          'half', t.half,
          'seatNos', t.Seat_Nos
        ) AS result
      FROM 
        ticket t
      JOIN 
        users u ON t.userID = u.userID
      WHERE 
        t.ticketNo = ?
    `;

    db.query(query, data, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).send("Database query error");
      }

      if (results.length > 0) {
        const invoiceData = results[0].result;
        console.log(
          `Server Replies to ${data} as ${JSON.stringify(invoiceData)}`
        );
        return res.json(invoiceData);
      } else {
        console.log(`Invoice not found with RefNo: ${data}`);
        return res.status(404).send("Invoice not found");
      }
    });
  }
});

// Other Authentication services
app.post("/other", (req, res) => {
  const { type, data } = req.body;
  console.log(
    `New Request::  type: ${type}    Mobile Number: ${JSON.stringify(data)}`
  );
  let userData = {};

  if (type === "google") {
    console.log("Google Authentication");
    // Verify user, then fetch userData from db and send back to the frontend
    const mobile = 94111111111;

    // This is a tempary query
    const sql = `SELECT userID, userType, empType, email 
             FROM users
             WHERE mobile = ?`;

    db.query(sql, mobile, (err, result) => {
      if (err) {
        console.log(err.message + "\n\n");
        userData.status = "error";
        res.json(userData); // Reply with 'error' in case of an error
      } else {
        console.log(
          `Entry searched successfully!\nUsers: ${JSON.stringify(result)}`
        );
        if (result.length > 0) {
          userData = result[0];
          userData.status = "success";
        } else {
          userData.status = "invalid";
        }

        console.log(`Server replies as ${JSON.stringify(userData)}\n\n`);
        res.json(userData);
      }
    });
  } else {
    console.log("Request Not Found!");
    userData.status = "error";
    res.json(userData);
    //return res.status(404).json('Request Not Found!');
  }
});
