import { db } from "../../db.js";

import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import createHttpError from "http-errors";

function generateOTP() {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  return otp;
}

function sendOTP(email, OTP) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.COMPANY_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.COMPANY_EMAIL,
    to: email,
    subject: "Your OTP",
    text: `Your OTP is: ${OTP}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

export const otp = (req, res, next) => {
  const { type, data } = req.body;
  console.log("\n\nOTP endpoint:: tyep: ", type);

  // Here you might want to generate an OTP and save it
  if (type === "loginOTP" || type === "signupOTP" || type === "request") {
    let loginOTP = generateOTP();
    sendOTP(data.email, loginOTP);
    console.log(
      `New Request::  type: ${type}    Mobile Number: ${data.mobile}   Email: ${data.email}\n   OTP:: ${loginOTP}\n\n`
    );

    /* We can use search and update query here -- */
    const check_sql = `SELECT otpID FROM OTP_TABLE WHERE contactNo = ? AND email = ?`;

    db.query(check_sql, [data.mobile, data.email], (err, result) => {
      // Previous otp space available
      if (result.length > 0) {
        console.log("OTP ID: ", result[0].otpID);
        const update_otp_sql = `UPDATE OTP_TABLE SET otp = ? WHERE otpID = ?`;
        const values = [loginOTP, result[0].otpID];

        db.query(update_otp_sql, values, (err) => {
          if (err) {
            console.log(err);
            next(createHttpError(502, "OTP is failed!"));
          } else {
            console.log("OTP updated successfully!");
            res.status(201).send("success");
          }
        });
      }
      // No previous otps
      else {
        const new_entry_sql = `INSERT INTO OTP_TABLE (otp, contactNo, email) VALUES (?)`;
        const values = [loginOTP, data.mobile, data.email];

        db.query(new_entry_sql, [values], (err) => {
          if (err) {
            console.log(err);
            next(createHttpError(502, "OTP is failed!"));
          } else {
            console.log("OTP added successfully!");
            res.status(201).send("success");
          }
        });
      }
    });
  }

  // Verifying OTP
  else if (type === "verify") {
    const { mobile, email, value } = data;

    console.log(`Verify user mobile: ${mobile}  email: ${email}  OTP:${value}`);

    const sql = `SELECT otp FROM OTP_TABLE WHERE email = ? AND contactNo = ? limit 1`;

    // ==> Problem in the query cannot handle setting page requests
    // ==> Suggestion:: Handle settings page requests according to the origin

    db.query(sql, [email, mobile], (err, response) => {
      if (err) {
        console.log(err);
        next(createHttpError(502, "Database connection is failed!"));
      } else {
        console.log(`ServerOTP:${response[0].otp} | UserOTP:${value}`);
        const reply = value === response[0].otp ? "true" : "false";
        console.log("Verification is passed: ", reply);
        res.status(200).send(reply);
      }
    });
  }
};
