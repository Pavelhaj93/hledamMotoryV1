import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "mail.webglobe.cz", // Replace with Webglobe.cz SMTP server address
  port: 587, // Use the appropriate port number
  secure: false, // Set to true if using a secure connection (like SSL/TLS)
  auth: {
    user: "info@hledammotory.cz",
    pass: "Neuro164,
  },
  tls: {
    rejectUnauthorized: false,
  },
  debug: true,
});

export const mailOptions = {
  from: 'info@hledammotory.cz',
  to: "info@hledammotory.cz",
};
