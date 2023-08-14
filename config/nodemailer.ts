import nodemailer from "nodemailer";
import { env } from "process";

const email = env.EMAIL;
const pass = env.EMAIL_PASSWORD;

export const transporter = nodemailer.createTransport({
  host: "mailproxy.webglobe.com", // Replace with Webglobe.cz SMTP server address
  port: 587, // Use the appropriate port number
  secure: false, // Set to true if using a secure connection (like SSL/TLS)
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const mailOptions = {
  from: email,
  to: email,
};
