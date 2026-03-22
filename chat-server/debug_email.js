import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

console.log("Email User Configured:", process.env.EMAIL_USER);
console.log("App Password Configured:", process.env.APP_PASSWORD ? "[REDACTED]" : "undefined");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASSWORD,
  },
});

async function testEmail() {
  if (!process.env.EMAIL_USER) {
    console.error("No EMAIL_USER found in .env");
    return;
  }
  
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to self to test
      subject: "Test Email from We Connect",
      text: "This is a test email to ensure nodemailer works.",
    });
    console.log("Email sent successfully! Message ID:", info.messageId);
  } catch (error) {
    console.error("Nodemailer failed:", error);
  }
}

testEmail();
