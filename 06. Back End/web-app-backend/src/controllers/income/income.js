import createHttpError from "http-errors";
import { db } from "../../db.js";

export const Income = async (req, res, next) => {
  const { userID, date } = req.query.data;
  console.log("\nRequesting Bus Income: ", req.query.data);

  try {
    const sql = `
        SELECT 
            a.vehicleID AS id,
            (a.receivedMoney - a.refundMoney) AS value,
            v.vehicleRegNo AS label
        FROM 
            ACTIVITY a
        JOIN
            VEHICLE v ON a.vehicleID = v.vehicleID
        WHERE
            a.ownerID = ? AND a.date = ?;
    `;

    const [results] = await db.query(sql, [userID, date]);

    let earning = 0.0;
    results.forEach((element) => {
      earning = earning + parseFloat(element.value);
    });

    console.log("Graph Data: ", results);
    console.log("Earning: ", earning);
    res.status(200).json({ graphData: results, earning });
  } catch (error) {
    console.error("Error in finding general income:", or);
    next(createHttpError(503, "Database connection failed!"));
  }
};
