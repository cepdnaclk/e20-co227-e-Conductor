import { db } from "../../db.js";

export const General = async (req, res, next) => {
  const userID = req.query.data;
  console.log("General Income Details: userID ", userID);

  try {
    const incomeData = {
      earning: { amount: 50000, increment: 25 },
      withdraw: { amount: 20000, increment: -10 },
      balance: { amount: 30000, increment: 10 },
      credits: { amount: 40000, increment: 10 },
    };
    res.json(incomeData);
  } catch (err) {
    console.error("Error in finding general income:", err);
    next(createHttpError(503, "Database connection failed!"));
  }
};
