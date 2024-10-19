import createHttpError from "http-errors";
import { db } from "../../db.js";

const TrackMyBuses = async (req, res, next) => {
  const { data } = req.query;
  console.log("\nFind My Buses: ", data);

  try {
    const sql = `SELECT 
                    regNo,
                    JSON_OBJECT(
                        'lat', lat,
                        'lng', lng
                    ) AS location
                FROM 
                    BUS_LOCATIONS
                WHERE 
                    regNo IN (?)
            `;
    const [result] = await db.query(sql, [data]);
    console.log("Results: ", result);

    if (result.length < 1) {
      console.log("Failed to get current location!");
      throw createHttpError(503, "Failed to get current location!");
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default TrackMyBuses;
