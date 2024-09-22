import createHttpError from "http-errors";
import { db } from "../../db.js";

// Getting bus stop names
const BusStopNames = async (req, res, next) => {
  console.log(`\nRequesting Bus Stop Names`);

  const sql =
    "SELECT nameID AS id, name, JSON_OBJECT('lat', lat, 'lng', lng) AS location FROM BUSSTOP_NAMES";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err.message);
      next(createHttpError(503, "Database connection is failed!"));
    } else {
      console.log("Bus stop names: ", result);
      res.status(200).json(result);
    }
  });
};

export default BusStopNames;
