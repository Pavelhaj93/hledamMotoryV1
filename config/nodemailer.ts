import nodemailer from "nodemailer";
import { env } from "process";

const email = env.EMAIL;
const pass = env.EMAIL_PASSWORD;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass,
  },
});

export const mailOptions = {
  from: email,
  to: email,
};
