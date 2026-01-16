import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS, // App Password
  },
  tls: {
    rejectUnauthorized: false, // 👈 FIX
  },

});

export default async function sendMail(to, otp) {
  return transporter.sendMail({
    from: `"Support" <${process.env.EMAIL}>`,
    to,
    subject: "Reset your password",
    html: `<h3>Your OTP is ${otp}</h3><p>Valid for 5 minutes</p>`,
  });
}


