import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config();

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASSWORD;

export const transporter = nodemailer.createTransport({
  host: "mail.webglobe.cz", // Replace with Webglobe.cz SMTP server address
  port: 587, // Use the appropriate port number
  secure: false, // Set to true if using a secure connection (like SSL/TLS)
  auth: {
    user: email,
    pass: pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
  debug: true,
});

export const mailOptions = {
  from: email,
  to: email,
};
