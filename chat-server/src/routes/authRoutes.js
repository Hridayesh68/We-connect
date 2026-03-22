import express from "express";
import {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
  sendOtp,
  forgotPassword,
  resetPassword,
  googleAuth
} from "../controllers/authController.js";

import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", protectRoute, checkAuth);
router.put("/update-profile", protectRoute, updateProfile);

router.post("/send-otp", sendOtp);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/google", googleAuth);

export default router;