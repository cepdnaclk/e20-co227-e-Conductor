else if (type === "Trans2") {
    console.log(`Confirm refund: Trans2`);

    const sql1 = `SELECT passengerID FROM TICKET WHERE ticketNo = ?`;

    db.query(sql1, parseInt(data.refNo), (err1, result1) => {
      if (err1) {
        console.log(err1.message);
        return res.json("error");
      } else {
        const sql2 = `UPDATE USERS SET credits = credits + ? WHERE userID = ?`;
        const data2 = [data.refund, result1[0].passengerID];

        db.query(sql2, data2, (err2, result2) => {
          if (err2) {
            console.log(err2.message);
            return res.json("error");
          } else {
            if (result2.changedRows < 1) {
              return res.json("error");
            } else {
              const sql3 = `UPDATE TICKET SET status = 'Refunded' WHERE ticketNo = ?`;

              db.query(sql3, parseInt(data.refNo), (err3, result3) => {
                if (err3) {
                  console.log(err3.message);
                  return res.json("error");
                } else {
                  const sql4 = `INSERT INTO TRANSACTION (userID, amount, date, time, refNo, type) VALUES (?)`;

                  const data4 = [
                    result1[0].passengerID,
                    data.refund,
                    data.cancelDate,
                    data.cancelTime,
                    data.refNo,
                    "Refund",
                  ];

                  db.query(sql4, [data4], (err4, result4) => {
                    if (err4) {
                      console.log(err4.message);
                      return res.json("error");
                    } else {
                      return res.json("success");
                    }
                  });
                }
              });
            }
          }
        });
      }
    });

  } else if (type === "Trans3") {
    console.log(`new request: ${JSON.stringify(data)}`);
    res.json("0000025");
  } else if (type === "Trans4") {
    console.log(`new request: ${JSON.stringify(data)}`);
    res.json("success");
  }
});