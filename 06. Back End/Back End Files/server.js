import express from "express";
import cors from "cors";
import mysql from "mysql";

const app = express();
app.use(cors());
app.use(express.json());

const port = 8000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "e_conductor",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to the database");
});

app.post("/OTP", (req, res) => {
  const { type, data } = req.body; //login: Req1
  //console.log([type, data]);
  res.json("qwerty");
});

/* app.get("/OTP", (req, res) => {
  //console.log(req.body);
  //res.json("qwerty");
}); */

app.post("/users", (req, res) => {
  const { type, data } = req.body; //logn:Req2, signup:Post2

  if (type === "Req2") {
    const sql = "SELECT * FROM user WHERE contact = (?) limit 1";

    db.query(sql, data, (err, data) => {
      if (err) {
        console.log(err.message);
      } else {
        //console.log(data[0].id);
        res.json(data[0].id);
      }
    });
  } else if (type === "Post2") {
    const sql =
      "INSERT INTO user (first_name, last_name, email, contact) VALUES (?)";

    const values = [data.fName, data.lName, data.email, data.mobile];

    db.query(sql, [values], (err, res) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log("Entry added successfully!");
      }
    });
  }
});

/* app.post('/users', (req, res) => {
    const {type, data} = req.body;
    console.log(type); Post2
    console.log(data);
    
    const sql = "INSERT INTO user (first_name, last_name, email, contact) VALUES (?)";

    const values  =[
        data.fName,
        data.lName,
        data.email,
        data.mobile
    ]

    db.query(sql, [values], (err, res) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("Entry added successfully!");
        }
    })

    console.log(`type: ${type}  email: ${data.email}`);

}) */

app.listen(port, () => {
  console.log(`listening to ${port}`);
});
