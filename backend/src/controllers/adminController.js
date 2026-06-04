import AuthService from "../services/adminService.js";

class AuthController {

  async sendOtp(req, res) {
    try {

      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required"
        });
      }

      await AuthService.sendOtp(email);

      return res.status(200).json({
        success: true,
        message: "OTP sent successfully"
      });

    } catch (error) {

      return res.status(400).json({
        success: false,
        message: error.message
      });

    }
  }

  async verifyOtp(req, res) {
    try {

      const { email, otp } = req.body;

      if (!email || !otp) {
        return res.status(400).json({
          success: false,
          message: "Email and OTP are required"
        });
      }

      const token = await AuthService.verifyOtp(
        email,
        otp
      );

      res.cookie("adminToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        maxAge: 30 * 60 * 1000
      });

      return res.status(200).json({
        success: true,
        message: "Login successful"
      });

    } catch (error) {

      return res.status(400).json({
        success: false,
        message: error.message
      });

    }
  }

  async logout(req, res) {
    try {

      res.clearCookie("adminToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none"
      });

      return res.status(200).json({
        success: true,
        message: "Logout successful"
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: "Logout failed"
      });

    }
  }
}

export default new AuthController();