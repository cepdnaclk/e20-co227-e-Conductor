import createHttpError from "http-errors";
import { db } from "../../db.js";

function adjustDate(year, month, date, adjustmentType) {
  let originalDate = new Date(year, month - 1, date); // Month is 0-indexed in JS

  // Adjust the date based on the type of adjustment
  switch (adjustmentType) {
    case "year":
      originalDate.setMonth(originalDate.getMonth() - 11);
      break;
    case "month":
      originalDate.setMonth(originalDate.getMonth() - 1);
      break;
    case "week":
      originalDate.setDate(originalDate.getDate() - 7);
      break;
    default:
      console.error("Invalid adjustment type provided.");
      throw createHttpError(400, "Bad Type");
  }

  // Format the adjusted date as YYYY-MM-DD
  const formattedDate = originalDate.toISOString().split("T")[0];
  console.log("Formated Date: ", formattedDate);

  return formattedDate;
}

export const income = async (req, res, next) => {
  const { data } = req.query;
  console.log("\nRequesting bus income:", data);

  // Destructuring Object
  const busId = data.busId;
  const DATE = parseInt(data.DATE);
  const MONTH = parseInt(data.MONTH);
  const YEAR = parseInt(data.YEAR);
  const type = data.type;

  // Outputs
  const receivedData = [],
    refundData = [],
    earningData = [],
    xLabels = [];

  try {
    let sql, values;

    // Annual Summary
    if (type === "year") {
      const minDate = adjustDate(YEAR, MONTH, 1, type);

      sql = `
          SELECT 
              DATE_FORMAT(STR_TO_DATE(date, '%Y-%m-%d'), '%Y %b') AS xLabel,
              SUM(receivedMoney) AS receivedMoney,
              SUM(refundMoney) AS refundMoney
          FROM 
              ACTIVITY
          WHERE 
              vehicleID = ? AND date > ?
          GROUP BY 
              DATE_FORMAT(STR_TO_DATE(date, '%Y-%m-%d'), '%Y %b')
      `;

      values = [busId, minDate];
    }

    // Monthly and weekly summary
    else {
      const currentDate = `${YEAR}-${MONTH}-${DATE}`;
      const minDate = adjustDate(YEAR, MONTH, DATE, type);

      sql = `
          SELECT 
              DATE_FORMAT(STR_TO_DATE(date, '%Y-%m-%d'), '%b %e') AS xLabel,
              receivedMoney,
              refundMoney
          FROM
              ACTIVITY
          WHERE
              vehicleID = ? AND date <= ? AND date >= ?
      `;

      values = [busId, currentDate, minDate];
    }

    const [results] = await db.query(sql, values);

    //console.log("results: ", results);

    if (results === 0) {
      console.log("Income not found!");
      throw createHttpError(404, "Income not found!");
    }

    results.forEach((element) => {
      receivedData.push(element.receivedMoney);
      refundData.push(element.refundMoney);
      earningData.push(
        (element.receivedMoney - element.refundMoney).toFixed(2)
      );
      xLabels.push(element.xLabel);
    });

    console.log("receivedData: ", receivedData);
    console.log("refundData: ", refundData);
    console.log("earningData: ", earningData);
    console.log("xLabels: ", xLabels);
    res.json({ receivedData, refundData, earningData, xLabels });
  } catch (error) {
    console.log(error.message + "\n");
    next(createHttpError(503, "Database connection is failed!"));
  }
};
