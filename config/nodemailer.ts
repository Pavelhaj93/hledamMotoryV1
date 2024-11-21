import nodemailer from "nodemailer";

const mail = process.env.MAIL;
const password = process.env.EMAIL_PASSWORD;

export const transporter = nodemailer.createTransport({
  host: "mail.webglobe.cz", // Replace with Webglobe.cz SMTP server address
  port: 587, // Use the appropriate port number
  secure: false, // Set to true if using a secure connection (like SSL/TLS)
  auth: {
    user: mail,
    pass: password,
  },
  tls: {
    rejectUnauthorized: false,
  },
  debug: true,
});

export const mailOptions = {
  from: mail,
  to: mail,
};
