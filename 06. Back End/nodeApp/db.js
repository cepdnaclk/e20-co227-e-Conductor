import mysql from "mysql2";
import env from "dotenv";

env.config();

export const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
});

/* export const db = mysql.createConnection({
  host: process.env.LOCALMYSQLHOST,
  user: process.env.LOCALMYSQLUSER,
  password: process.env.LOCALMYSQLPASSWORD,
  database: process.env.LOCALMYSQLDATABASE,
  port: process.env.LOCALMYSQLPORT,
}); */

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});
