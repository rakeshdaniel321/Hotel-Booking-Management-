import Otp from "../models/OtpModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { generateOtp } from "../utils/GenerateOtp.js";
import EmailService from "./EmailService.js";

class AuthService {

  async sendOtp(email) {
    if (!email) {
      throw new Error("Email Required");
    }

    if ( email.toLowerCase() !==process.env.ADMIN_EMAIL.toLowerCase()) 
      {
      throw new Error("Unauthorized");
     }

    const otp = generateOtp();
    const hashedOtp = await bcrypt.hash(otp, 10);

    await Otp.deleteMany({ email });

    await Otp.create({
      email,
      otp: hashedOtp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    });

    await EmailService.sendResendEmail({
      email,
      otp
    });

    return true;
  }

  async verifyOtp(email, otp) {
    

    if (!email || !otp) {
      throw new Error("Email and OTP Required");
    }

    const otpDoc = await Otp.findOne({ email });
    
    if (!otpDoc) {
      throw new Error("OTP Not Found");
    }

    if (otpDoc.expiresAt.getTime() < Date.now()) {
      await Otp.deleteOne({ _id: otpDoc._id });
     
      throw new Error("OTP Expired");
    }

   
    const valid = await bcrypt.compare(otp, otpDoc.otp);
    

    if (!valid) {
      throw new Error("Invalid OTP");
    }

   
    await Otp.deleteMany({ email });
    

   
    if (!process.env.JWT_SECRET) {
      
      throw new Error("JWT_SECRET is missing from environment variables!");
    }

    
    const token = jwt.sign(
      {
        email,
        role: "admin"
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30m"
      }
    );
    
   
    return token;
  }
}

export default new AuthService();
