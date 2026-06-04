import express from 'express';
import multer from 'multer';
import InquiryController from '../controllers/InquiryController.js';
import { adminAuth } from '../middleware/AdminAuth.js'; 
const router = express.Router();

//multer memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images allowed"));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});


router.post('/inquiries', upload.single('screenshot'), InquiryController.createInquiry);

router.get('/inquiries', adminAuth, InquiryController.fetchInquiries);

export default router;
