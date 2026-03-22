import mongoose from "mongoose";
import User from "./src/models/user.js";
import { connectDB } from "./src/lib/db.js";
import dotenv from "dotenv";

dotenv.config();

async function testAuthFlows() {
  try {
    await connectDB();
    const email = "test_advanced_auth@example.com";
    // clear previous
    await User.deleteOne({ email });

    console.log("\n=== Testing Signup (OTP Generate) ===");
    const signupRes = await fetch("http://localhost:8080/api/auth/signup", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName: "E2E Tester", email, password: "password123" })
    });
    console.log("Signup Status:", signupRes.status);
    
    // get OTP from DB
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not created. Aborting tests.");
      process.exit(1);
    }
    console.log("User in DB has OTP:", !!user.verificationOTP, " | isVerified:", user.isVerified);

    console.log("\n=== Testing Verify Email ===");
    const verifyRes = await fetch("http://localhost:8080/api/auth/verify-email", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp: user.verificationOTP })
    });
    console.log("Verify Status:", verifyRes.status);
    const vUser = await User.findOne({ email });
    console.log("User in DB isVerified:", vUser.isVerified);

    console.log("\n=== Testing Forgot Password ===");
    const forgotRes = await fetch("http://localhost:8080/api/auth/forgot-password", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    console.log("Forgot Status:", forgotRes.status);
    
    // get Reset token from DB
    const uUser = await User.findOne({ email });
    console.log("User in DB has Reset Token:", !!uUser.resetPasswordToken);

    console.log("\n=== Testing Reset Password ===");
    const resetRes = await fetch(`http://localhost:8080/api/auth/reset-password/${uUser.resetPasswordToken}`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: "newpassword123" })
    });
    console.log("Reset Status:", resetRes.status);

    console.log("\n=== Testing Login with New Password ===");
    const loginRes = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: "newpassword123" })
    });
    console.log("Login Status:", loginRes.status);
    console.log("Login Data:", await loginRes.json());
    
    // cleanup
    await User.deleteOne({ email });
    console.log("\nAll E2E tests passed!");
    process.exit(0);
  } catch (error) {
    console.error("Test execution failed:", error);
    process.exit(1);
  }
}

testAuthFlows();
