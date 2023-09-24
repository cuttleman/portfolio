"use server";

import * as nodemailer from "nodemailer";

export interface IFormData {
  subject: string;
  email: string;
  message: string;
}

export const sendAction = async (data: IFormData) => {
  const { subject, email, message } = data;

  if (!subject || !email || !message) return;
  if (message.includes("<script") || message.includes("<iframe")) return;

  const transporter = nodemailer.createTransport(
    {
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_USER_EMAIL,
        pass: process.env.NODEMAILER_USER_PASSWORD,
      },
    },
    { from: `Portfolio 2023 <${process.env.NODEMAILER_USER_EMAIL}>`, to: "silluat11@gmail.com" }
  );

  return new Promise((r, j) => {
    transporter
      .sendMail({
        subject,
        text: message,
        replyTo: email,
      })
      .catch((err) => j(err))
      .finally(() => {
        transporter.close();
        r(true);
      });
  });
};
