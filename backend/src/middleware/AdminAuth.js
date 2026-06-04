import jwt from "jsonwebtoken";

export const adminAuth = (req, res, next) => {
  try {
  
    const token = req.cookies.adminToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Login Required. Token missing."
      });
    }

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    if (!process.env.ADMIN_EMAIL) {
      return res.status(500).json({
        success: false,
        message: "ADMIN_EMAIL is missing in server environment!"
      });
    }
     
    
   //  console.log("!!! token admin email:", decoded.email);
   //  console.log("file email:", process.env.ADMIN_EMAIL);
     
    
    if (
      decoded.email.toLowerCase().trim() !== 
      process.env.ADMIN_EMAIL.toLowerCase().trim()
    ) {
      // console.log("email not same!");
      return res.status(403).json({
        success: false,
        message: "Access Denied. Unauthorized admin account."
      });
    }

    
    req.admin = decoded;
    
  
    
    next();

  } catch (error) {
   //  console.log("middleware crash error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Session Expired. Please login again."
    });
  }
};
