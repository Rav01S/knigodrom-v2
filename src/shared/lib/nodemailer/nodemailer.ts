"use server";

import nodemailer from "nodemailer";
import { SendMailOptions } from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.GOOGLE_GMAIL_SMTP_ADDRESS,
  port: parseInt(process.env.GOOGLE_GMAIL_SMTP_PORT || "465"),
  secure: process.env.GOOGLE_GMAIL_SMTP_SECURE === "true",
  auth: {
    user: process.env.GOOGLE_GMAIL_APP_EMAIL,
    pass: process.env.GOOGLE_GMAIL_APP_PASSWORD,
  },
});

type SendEmailResult =
  | { success: true; messageId: string }
  | { success: false; error: string };

export async function sendEmail(
  mailOptions: SendMailOptions
): Promise<SendEmailResult> {
  if (!mailOptions.to || !mailOptions.subject) {
    throw new Error("Missing required mail options (from, to, subject).");
  }
  mailOptions.from = process.env.GOOGLE_GMAIL_APP_EMAIL;

  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent successfully. Message ID:", info.messageId);
  return { success: true, messageId: info.messageId };
}
