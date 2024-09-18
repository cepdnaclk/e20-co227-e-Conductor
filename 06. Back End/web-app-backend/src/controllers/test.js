import { db } from "../db.js";

export const dbTest = async (req, res, next) => {
  console.log(`Testing`);
  try {
    const { query } = req.body;
    console.log("query: ", query);

    db.query(query, (err, result) => {
      if (err) {
        console.log(err.message);
        res.status(500).json(err);
      } else {
        res.status(201).json({ reply: "Success", message: result });
      }
    });
  } catch (error) {
    next(error);
  }
};
