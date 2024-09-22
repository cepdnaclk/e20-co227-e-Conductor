app.post("/tickets", (req, res) => {
    const { type, data } = req.body;
  
    
    if (type === "Tkt1") {
      
    }
  
    // Requesting specific ticket (===>Check userID also)
    else if (type === "Tkt2") {
      console.log(
        `Invoice Request:: type: ${type}  Ref.No.: ${JSON.stringify(data)}`
      );
      const query = `
        SELECT 
          JSON_OBJECT(
            'ticketNo', LPAD(t.ticketNo, 7, '0'),
            'customerName', CONCAT(u.fName, ' ', u.lName),
            'customerEmail', u.email,
            'customerMobile', u.mobile,
            'issuedDate', t.issuedDate,
            'issuedTime', t.issuedTime,
            'vehicalNo', v.vehicleRegNo,
            'type', v.serviceType,
            'routeNo', r.routeNo,
            'route', CONCAT(r.start, ' - ', r.end),
            'date', t.jrnDate,
            'time', s.departureTime,
            'from', fromStop.name,
            'to', toStop.name,
            'journey', t.distance,
            'price', FORMAT(t.ticketPrice, 2),
            'full', t.full,
            'half', t.half,
            'seatNos', t.seatNos
          ) AS result
        FROM 
          TICKET t
        JOIN 
          USERS u ON t.passengerID = u.userID
        JOIN
          SCHEDULE s ON s.scheduleID = t.scheduleID
        JOIN
          VEHICLE v ON v.vehicleID = s.vehicleID
        JOIN
          ROUTE r ON r.routeID = s.routeID
        JOIN
          BUSSTOP_NAMES fromStop ON fromStop.nameID = t.fromLocation
        JOIN
          BUSSTOP_NAMES toStop ON toStop.nameID = t.toLocation
        WHERE 
          t.ticketNo = ?
      `;
  
      db.query(query, data.refNo, (err, results) => {
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
  
    // Requesting ticket confirmation (Ticked is purchased by the user)
    // ===> Send reply to the frontend as 'success' if purchasing is successfull. Otherwise reply as 'error'.
    // ===> Also need to write a suitable query to store the new ticket infomation to the 'ticket' table
    else if (type === "Tkt3") {
      console.log(
        `\nInvoice Request:: type: ${type}  Ticket info.: ${JSON.stringify(
          data
        )}\n`
      );
      
      let totalPrice = parseFloat(data.price) * data.full + (parseFloat(data.price) / 2) * data.half;
      let discount = totalPrice * (data.discount / 100);  
  
      const sql = `SELECT credits FROM USERS WHERE userID = ?`;
      db.query(sql, data.userID, (err, result) => {    
        if (err) {
          console.log(err.message);
          return res.json("error");
        } else {
          if (result[0].credits >= totalPrice) {
            const sql1 = `UPDATE USERS SET credits = credits - ? WHERE userID = ?`;
            const values1 = [totalPrice, data.userID];
  
            db.query(sql1, values1, (err1, result1) => {
              if (err1) {
                console.log(err1.message);
                return res.json("error");
              } else {
                console.log("Credits updated successfully!");
                const sql2 = `INSERT INTO TRANSACTION (userID, amount, date, time, type) VALUES (?)`;
                const values2 = [
                  data.userID,
                  totalPrice,
                  data.issuedDate,
                  data.issuedTime,
                  "Payment",
                ];
  
                db.query(sql2, [values2], (err2, result2) => {
                  if (err2) {
                    console.log(err2.message);
                    return res.json("error");
                  } else {
                    const sql3 = `INSERT INTO TICKET (passengerID,issuedDate,issuedTime,jrnDate,jrnStartTime,jrnEndTime,fromLocation,toLocation,distance,half,full,ticketPrice,seatNos,status,scheduleID,transID,discount) VALUES (?)`;
  
                    const values3 = [
                      data.userID,
                      data.issuedDate,
                      data.issuedTime,
                      data.date,
                      data.aproxDepT,
                      data.aproxAriT,
                      data.from.id,
                      data.to.id,
                      JSON.stringify(parseFloat(data.journey)),
                      data.half,
                      data.full,
                      totalPrice,
                      JSON.stringify(data.seatNos),
                      "Available",
                      data.shceduleId,
                      result2.insertId,
                      discount,
                    ];
  
                    db.query(sql3, [values3], (err3, result3) => {
                      if (err3) {
                        console.log(err3.message);
                        return res.json("error");
                      } else {
                        console.log("Ticket added successfully!");
                        return res.json("success");
                      }
                    });
                  }
                });
              }
            });
          } else {
            res.json("Insufficient");
          }
        }
      });
    } else if (type === "Tkt4") {
      console.log(`Available ticket Request:: type: ${type}  userId:${data}`);
  
      const sql1 = `SELECT * FROM TICKET WHERE passengerID = ? AND status = 'Available'`;
  
      db.query(sql1, data, (err, result) => {
        if (err) {
          console.log(err.message);
        } else {
          const user_ticket_data = [];
          const tickets = result.map((ticket) => {
            return new Promise((resolve, reject) => {
              const sql2 = `SELECT 
                      SCHEDULE.departureTime,
                      VEHICLE.vehicleRegNo, 
                      VEHICLE.org, 
                      VEHICLE.serviceType, 
                      ROUTE.routeNo, 
                      ROUTE.start, 
                      ROUTE.end, 
                      fromStop.name AS fromLocation, 
                      toStop.name AS toLocation
                  FROM 
                      SCHEDULE 
                  JOIN 
                      VEHICLE ON SCHEDULE.vehicleID = VEHICLE.vehicleID 
                  JOIN 
                      ROUTE ON SCHEDULE.routeID = ROUTE.routeID 
                  JOIN 
                      BUSSTOP_NAMES fromStop ON fromStop.nameID = ? 
                  JOIN 
                      BUSSTOP_NAMES toStop ON toStop.nameID = ?
                  WHERE 
                      SCHEDULE.scheduleID = ?;`;
  
              const values2 = [
                ticket.fromLocation,
                ticket.toLocation,
                ticket.scheduleID,
              ];
  
              db.query(sql2, values2, (err2, result2) => {
                if (err2) {
                  console.log(err2.message);
                  reject(err2);
                } else {
                  const fiveMins = 300000;
                  const day = 86400000;
                  const now = new Date(Date.now());
                  const startDateTime = new Date(
                    `${ticket.jrnDate} ${ticket.jrnStartTime}`
                  );
                  const endDateTime = new Date(
                    `${ticket.jrnDate} ${ticket.jrnEndTime}`
                  );
                  let tracking = false;
                  let cancel = false;
  
                  if (now.getTime() + day < startDateTime.getTime()) {
                    cancel = true;
                  }
  
                  if (
                    now.getTime() + fiveMins > startDateTime.getTime() &&
                    now.getTime() - fiveMins < endDateTime.getTime() &&
                    !cancel
                  ) {
                    tracking = true;
                  }
  
                  user_ticket_data.push({
                    refNo: ticket.ticketNo.toString().padStart(6, "0"),
                    date: ticket.jrnDate,
                    departure: result2[0].departureTime,
                    fromT: ticket.jrnStartTime,
                    toT: ticket.jrnEndTime,
                    from: result2[0].fromLocation,
                    to: result2[0].toLocation,
                    seats: ticket.seatNos.join(", "),
                    full: ticket.full,
                    half: ticket.half,
                    price: ticket.ticketPrice,
                    regNo: result2[0].vehicleRegNo,
                    org: result2[0].org,
                    service: result2[0].serviceType,
                    route: `${result2[0].routeNo} ${result2[0].start}-${result2[0].end}`,
                    tracking: tracking,
                    cancel: cancel,
                  });
                  resolve();
                }
              });
            });
          });
  
          Promise.all(tickets)
            .then(() => {
              // Send the response after all queries are complete
              res.json(user_ticket_data);
            })
            .catch((err) => {
              console.log(err);
              res.json("error");
            });
        }
      });
    } else if (type === "Tkt5") {
      console.log(`Refund request type: ${type} data:${JSON.stringify(data)}`);
  
      const sql1 = `SELECT issuedDate, issuedTime, ticketPrice FROM TICKET WHERE ticketNo = ?`;
  
      db.query(sql1, parseInt(data.refNo), (err1, result1) => {
        if (err1) {
          res.json("error");
        } else {
          const timeZoneOffset = 5 * 60 * 60 * 1000 + 30 * 60 * 1000;
  
          function createAdjustedDate(dateString, timeString) {
            const date = new Date(`${dateString} ${timeString}`);
            return new Date(date.getTime() + timeZoneOffset);
          }
  
          const issuedDateIST = createAdjustedDate(
            result1[0].issuedDate,
            result1[0].issuedTime
          );
          const cancelDateIST = createAdjustedDate(
            data.cancelDate,
            data.cancelTime
          );
  
          function calculateDuration(startDate, endDate) {
            const diff = endDate.getTime() - startDate.getTime();
  
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
              (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
  
            return { days, hours };
          }
  
          const duration = calculateDuration(issuedDateIST, cancelDateIST);
  
          const refundAmount = result1[0].ticketPrice * 0.75;
  
          const cancelData = {
            refNo: data.refNo,
            billingDate: issuedDateIST.toISOString().split("T")[0],
            billingTime: issuedDateIST.toISOString().substring(11, 16),
            cancelDate: cancelDateIST.toISOString().split("T")[0],
            cancelTime: cancelDateIST.toISOString().substring(11, 16),
            duration: `${duration.days} days ${duration.hours} hrs`,
            amount: result1[0].ticketPrice,
            refund: refundAmount.toFixed(2),
          };
          res.json(cancelData);
        }
      });
    } else if (type === "Tkt6") {
      console.log(`Tracking request type: ${type} data:${JSON.stringify(data)}`);
  
      const sql1 = `SELECT 
                        TICKET.jrnDate,
                        TICKET.jrnStartTime,
                        TICKET.jrnEndTime,
                        SCHEDULE.departureTime,
                        VEHICLE.vehicleRegNo, 
                        VEHICLE.org, 
                        VEHICLE.serviceType, 
                        ROUTE.routeNo, 
                        ROUTE.routeType,
                        ROUTE.start, 
                        ROUTE.end, 
                        JSON_OBJECT('name', fromStop.name, 'location', JSON_OBJECT('lat', fromStop.lat, 'lng', fromStop.lng)) AS 'from', 
                        JSON_OBJECT('name', toStop.name, 'location', JSON_OBJECT('lat', toStop.lat, 'lng', toStop.lng)) AS 'to',
                        JSON_OBJECT('name', startStop.name, 'location', JSON_OBJECT('lat', startStop.lat, 'lng', startStop.lng)) AS 'start'
                    FROM 
                        TICKET 
                    JOIN
                        SCHEDULE ON TICKET.scheduleID = SCHEDULE.scheduleID
                    JOIN 
                        VEHICLE ON SCHEDULE.vehicleID = VEHICLE.vehicleID 
                    JOIN 
                        ROUTE ON SCHEDULE.routeID = ROUTE.routeID 
                    JOIN 
                        BUSSTOP_NAMES fromStop ON TICKET.fromLocation = fromStop.nameID 
                    JOIN 
                        BUSSTOP_NAMES toStop ON TICKET.toLocation = toStop.nameID
                    JOIN
                        BUSSTOP_NAMES startStop ON ROUTE.startLocation = startStop.nameID
                    WHERE 
                        TICKET.ticketNo = ?;
                    `;
  
      db.query(sql1, parseInt(data.ticketNo), (err1, result1) => {
        if (err1) {
          console.log(err1.message);
          return res.json("error");
        } else {
          const fiveMins = 300000;
          const now = new Date(Date.now());
          const startDateTime = new Date(
            `${result1[0].jrnDate} ${result1[0].jrnStartTime}`
          );
          const endDateTime = new Date(
            `${result1[0].jrnDate} ${result1[0].jrnEndTime}`
          );
          let tracking = false;
  
          if (
            now.getTime() + fiveMins > startDateTime.getTime() &&
            now.getTime() - fiveMins < endDateTime.getTime()
          ) {
            tracking = true;
          }
  
          const busInfo = {
            refNo: data.ticketNo,
            regNo: result1[0].vehicleRegNo,
            route: `${result1[0].routeNo} ${result1[0].start}-${result1[0].end}`,
            org: result1[0].org,
            service: result1[0].serviceType,
            routeType: result1[0].routeType,
            startT: result1[0].departureTime,
            from: result1[0].from,
            to: result1[0].to,
            start: result1[0].start,
          };
  
          const routeLocations = [
            result1[0].from.location,
            result1[0].to.location,
          ];
  
          res.json({
            availability: `${tracking}`,
            busInfo,
            routePoints: routeLocations,
          });
        }
      });