import express from "express";

import AuthController from "../controllers/adminController.js";
import {otpRateLimit} from "../middleware/rateLimit.js"

const router = express.Router();

router.post("/send-otp",otpRateLimit,AuthController.sendOtp);

router.post("/verify-otp",AuthController.verifyOtp);

router.post("/logout",AuthController.logout);   


export default router;