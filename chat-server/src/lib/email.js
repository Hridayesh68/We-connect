import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASSWORD,
  },
});

export const sendVerificationEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email for We Connect",
      html: `
        <h1>Email Verification</h1>
        <p>Your OTP for email verification is: <strong>${otp}</strong></p>
        <p>This OTP will expire in 10 minutes.</p>
      `,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

export const sendPasswordResetEmail = async (email, resetUrl) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset your password for We Connect",
      html: `
        <h1>Password Reset</h1>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>If you didn't request this, you can ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
      `,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending password reset email:", error);
  }
};
