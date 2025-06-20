import nodemailer from "nodemailer";
import createError from "./error.js";
import { EMAIL_PASSWORD } from "../configs/enviroments.js";

const sendEmail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: "kcluxed@gmail.com",
      pass: EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false, // ⚠️ Bỏ qua lỗi chứng chỉ
    },
  });

  const mailOptions = {
    from: "Thay Hoang",
    to: email,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    // Ném lỗi cho middleware xử lý
    throw createError(500, `Gửi email thất bại: ${error.message}`);
  }
};

export default sendEmail;
