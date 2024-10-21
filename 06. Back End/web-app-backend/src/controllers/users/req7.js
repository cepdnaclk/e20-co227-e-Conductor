import createHttpError from "http-errors";
import { db } from "../../db.js";

// Update db with userData, after verification in settings page
const Req7 = async (req, res, next) => {
  const { data } = req.body;
  console.log("\nREQ 7:: Updating excisting user:", data);
  const sql = `UPDATE USERS SET userType=?, empType=?, fName=?, lName=?, email=?, mobile=?, nic=?, birthDay=?, ntc=?, licence=?, accName=?, accNo=?, 
                    bank=?, branch=? WHERE userID=?`;

  const updateData = [
    data.userType,
    data.empType,
    data.fName,
    data.lName,
    data.email,
    data.mobile,
    data.nic,
    data.birthDay,
    data.ntc,
    data.licence,
    data.accName,
    data.accNo,
    data.bank,
    data.branch,
    data.userID,
  ];

  try {
    const [result] = await db.query(sql, updateData);
    console.log("ServerResponse: success");
    res.status(200).json("success");
  } catch (err) {
    console.log(err.message + "\n\n");
    next(createHttpError(503, "Database connection failed!"));
  }
};

export default Req7;

/* db.query(sql, updateData, (err, result) => {
    if (err) {
      console.log(err.message + "\n\n");
      next(createHttpError(503, "Database connection is failed!"));
    } else {
      console.log("ServerResponse: success");
      res.status(200).json("success");
    }
  }); */
