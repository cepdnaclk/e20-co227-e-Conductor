import createHttpError from "http-errors";
import { db } from "../../db.js";

// Sending bus info
export const getInfo = async (req, res, next) => {
  const { data } = req.query;
  console.log("\nRequesting Bus Info:: userID: ", data);

  try {
    const sql = `
      SELECT 
          CAST(v.vehicleID AS CHAR) AS id,
          v.vehicleRegNo AS regNo,
          v.serviceType AS service,
          v.seats,
          IFNULL(SUM(a.rides), 0) AS rides, 
          IFNULL(SUM(a.receivedMoney - a.refundMoney), 0) AS earning,
          v.rating,
          v.insuranceExp,
          v.vrlExp AS VRL_Exp,
          v.ntcRegNo AS ntc,
          v.serviceType AS service,
          v.org,
          v.insuranceId,
          v.VRL_Id
      FROM 
          VEHICLE v
      LEFT JOIN
          ACTIVITY a ON v.vehicleID = a.vehicleID
      WHERE 
          v.ownerID = ? AND v.status = 'active'
      GROUP BY
          v.vehicleID;
    `;

    const [result] = await db.query(sql, data);

    if (result.length < 1) {
      console.log(`Vehicle not found with ownerID: ${data}`);
      throw createHttpError(404, "Vehicle not found!");
    }

    // Vehicles are available
    console.log("Vehicles: ", result);
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message + "\n");
    next(createHttpError(503, "Database connection is failed!"));
  }
};

// Deactivate bus info
export const deleteInfo = async (req, res, next) => {
  const data = req.body;
  console.log("\nDeactivating Bus(es): ", data);

  try {
    const sql = `
      UPDATE VEHICLE 
      SET status = 'inactive' 
      WHERE vehicleID IN (?);
    `;

    const [result] = await db.query(sql, [data]);

    console.log("Entry deleted successfully");
    res.status(200).send("success");
  } catch (err) {
    console.log(err.message + "\n");
    next(createHttpError(503, "Database connection is failed!"));
  }
};

// Updating bus info
export const updateInfo = async (req, res, next) => {
  const data = req.body;

  console.log("\nUpdating bus info ", data);

  try {
    const sqlCheck = `
      SELECT COUNT(*) AS count FROM VEHICLE 
      WHERE (insuranceId = ? OR VRL_Id = ? OR vehicleRegNo = ? OR ntcRegNo = ?) AND vehicleID <> ?;
    `;

    // Check for duplicates before updating
    const [duplicateResults] = await db.query(sqlCheck, [
      data.insuranceId,
      data.VRL_Id,
      data.regNo,
      data.ntc,
      data.id,
    ]);

    if (duplicateResults[0].count > 0) {
      console.log("Details are already used");
      return res.status(226).send("invalid");
    }

    const sqlUpdate = `
      UPDATE VEHICLE 
      SET 
        vehicleRegNo = ?, 
        serviceType = ?, 
        seats = ?, 
        insuranceExp = ?, 
        vrlExp = ?, 
        ntcRegNo = ?, 
        org = ?, 
        insuranceId = ?, 
        VRL_Id = ?
      WHERE 
        vehicleID = ?;
    `;

    const values = [
      data.regNo,
      data.service,
      data.seats,
      data.insuranceExp,
      data.VRL_Exp,
      data.ntc,
      data.org,
      data.insuranceId,
      data.VRL_Id,
      data.id,
    ];

    const [results] = await db.query(sqlUpdate, values);

    console.log("Vehicle updated successfully");
    res.status(200).send("success");
  } catch (err) {
    console.log(err.message + "\n");
    next(createHttpError(503, "Database connection is failed!"));
  }
};

// Add new bus
export const addInfo = async (req, res, next) => {
  const { data } = req.body;
  console.log("\nAdding new bus:", data);

  try {
    const sqlCheck = `
      SELECT COUNT(*) AS count FROM VEHICLE 
      WHERE (insuranceId = ? OR VRL_Id = ? OR vehicleRegNo = ? OR ntcRegNo = ?) AND status = 'active';
    `;

    // Check for duplicates before updating
    const [duplicateResults] = await db.query(sqlCheck, [
      data.insuranceId,
      data.VRL_Id,
      data.regNo,
      data.ntc,
    ]);

    if (duplicateResults[0].count > 0) {
      console.log("Details are already used");
      return res.status(226).send("invalid");
    }

    // No active vehicles. Checking for inactive vehicles
    const checkSql = `
      SELECT COUNT(*) AS count 
      FROM VEHICLE 
      WHERE ownerID = ? AND vehicleRegNo = ? AND status = 'inactive';
    `;
    const [checkResult] = await db.query(checkSql, [data.userID, data.regNo]);

    // Update the vehicle if found
    if (checkResult[0].count > 0) {
      const updateSql = `
        UPDATE VEHICLE 
        SET 
            status = 'active', 
            ntcRegNo = ?,
            org = ?, 
            serviceType = ?, 
            seats = ?, 
            insuranceExp = ?, 
            vrlExp = ?, 
            insuranceId = ?, 
            VRL_Id = ?,
            rating = '0.0',
            rides = 0,
            earning = '0.00'
        WHERE 
            ownerID = ? AND vehicleRegNo = ?;
      `;
      const updateValues = [
        data.ntc,
        data.org,
        data.service,
        data.seats,
        data.insuranceExp,
        data.VRL_Exp,
        data.insuranceId,
        data.VRL_Id,
        data.userID,
        data.regNo,
      ];

      await db.query(updateSql, updateValues);
    }

    // Insert a new vehicle if not found
    else {
      const insertSql = `
        INSERT INTO VEHICLE (
          vehicleRegNo, 
          ownerID,
          ntcRegNo, 
          seats, 
          serviceType, 
          org, 
          insuranceExp, 
          vrlExp,
          insuranceId, 
          VRL_Id, 
          rating,
          rides,
          earning, 
          status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '0.0', 0, '0.00', 'active');
      `;
      const insertValues = [
        data.regNo,
        data.userID,
        data.ntc,
        data.seats,
        data.service,
        data.org,
        data.insuranceExp,
        data.VRL_Exp,
        data.insuranceId,
        data.VRL_Id,
      ];

      await db.query(insertSql, insertValues);
    }

    console.log("Vehicle updated or inserted successfully");
    res.status(200).send("success");
  } catch (err) {
    console.log(err.message + "\n");
    next(createHttpError(503, "Database connection is failed!"));
  }
};

/* const sql = `
      SELECT 
          CAST(vehicleID AS CHAR) AS id,
          vehicleRegNo AS regNo,
          serviceType AS service,
          seats,
          rides, 
          earning,
          rating,
          insuranceExp,
          vrlExp AS VRL_Exp,
          ntcRegNo AS ntc,
          serviceType AS service,
          org,
          insuranceId,
          VRL_Id
      FROM 
          VEHICLE
      WHERE 
          ownerID = ? AND status = 'active';
    `; */
