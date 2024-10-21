import createHttpError from "http-errors";
import { db } from "../../db.js";
import { findIncrement } from "../bus/general.js";

export const General = async (req, res, next) => {
  const { userID, YEAR, MONTH, DATE } = req.query.data;
  console.log("\nGeneral Income Details: ", req.query.data);

  // Create bondries
  const currentMonthStart = `${YEAR}-${MONTH}-01`;
  const currentMonthEnd = `${YEAR}-${MONTH}-${DATE}`;
  const lastMonthStart =
    MONTH === "01"
      ? `${parseInt(YEAR) - 1}-12-01`
      : `${YEAR}-${parseInt(MONTH) - 1}-01`;
  const lastMonthEnd =
    MONTH === "01"
      ? `${parseInt(YEAR) - 1}-12-31`
      : `${YEAR}-${parseInt(MONTH - 1)}-31`;

  try {
    const sql = `
        SELECT 
            IFNULL(SUM(CASE WHEN a.date >= ? AND a.date < ? THEN a.receivedMoney ELSE 0 END), 0) AS currentRecieved,
            IFNULL(SUM(CASE WHEN a.date >= ? AND a.date <= ? THEN a.receivedMoney ELSE 0 END), 0) AS lastRecieved,
            IFNULL(SUM(CASE WHEN a.date >= ? THEN a.receivedMoney ELSE 0 END), 0) AS futureRecieved,
            IFNULL(SUM(CASE WHEN a.date >= ? AND a.date < ? THEN a.refundMoney ELSE 0 END), 0) AS currentRefund,
            IFNULL(SUM(CASE WHEN a.date >= ? AND a.date <= ? THEN a.refundMoney ELSE 0 END), 0) AS lastRefund,
            IFNULL(SUM(CASE WHEN t.date >= ? AND t.date <= ? THEN t.amount ELSE 0 END), 0) AS currentWithdraw,
            IFNULL(SUM(CASE WHEN t.date >= ? AND t.date <= ? THEN t.amount ELSE 0 END), 0) AS lastWithdraw,
            u.credits
        FROM
            ACTIVITY a
        LEFT JOIN
            TRANSACTION t ON t.userID = a.ownerID AND t.type = "withdraw"
        JOIN
            USERS u ON u.UserID = a.ownerID
        WHERE
            a.ownerID = ? ;
    `;

    const values = [
      // For Recieved Amount
      currentMonthStart,
      currentMonthEnd,
      lastMonthStart,
      lastMonthEnd,
      currentMonthEnd,

      // For Refund Amount
      currentMonthStart,
      currentMonthEnd,
      lastMonthStart,
      lastMonthEnd,

      // For Withdraw Amount
      currentMonthStart,
      currentMonthEnd,
      lastMonthStart,
      lastMonthEnd,

      // For Future Recieved
      userID,
    ];

    const [results] = await db.query(sql, values);

    if (results.length === 0) {
      console.log("Infomation not found!");
      throw createHttpError(404, "Infomation Not Found!");
    }

    console.log("Results: ", results);

    const {
      currentRecieved,
      lastRecieved,
      futureRecieved,
      currentRefund,
      lastRefund,
      currentWithdraw,
      lastWithdraw,
      credits,
    } = results[0];
    const currentEarnings = currentRecieved - currentRefund;
    const lastEarnings = lastRecieved - lastRefund;

    const incomeData = {
      earning: {
        amount: currentEarnings.toFixed(2),
        increment: findIncrement(currentEarnings, lastEarnings),
      },
      withdraw: {
        amount: parseFloat(currentWithdraw).toFixed(2),
        increment: findIncrement(currentWithdraw, lastWithdraw),
      },
      balance: {
        amount: (currentEarnings - currentWithdraw).toFixed(2),
        increment: findIncrement(
          currentEarnings - currentWithdraw,
          lastEarnings - lastWithdraw
        ),
      },
      withdrawable: {
        amount: (credits - futureRecieved).toFixed(2),
      },
    };

    console.log("Income Data: ", incomeData);
    res.status(200).json(incomeData);
  } catch (err) {
    console.error("Error in finding general income:", err);
    next(createHttpError(503, "Database connection failed!"));
  }
};
