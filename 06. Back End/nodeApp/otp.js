import crypto from 'crypto';
import nodemailer from 'nodemailer';

export const generateOTP = () => {
    return crypto.randomBytes(3).toString("hex");
}

export const sendOTP = (email, OTP) => {
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

    transporter.sendMail(mailOptions,(error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
}
