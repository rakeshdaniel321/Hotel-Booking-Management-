
import InquiryService from '../services/InquiryService.js';

class InquiryController {
  async createInquiry(req, res, next) {
    try {
      const fileBuffer = req.file ? req.file.buffer : null;
      const result = await InquiryService.processTableInquiry(req.body, fileBuffer);
      
      res.status(201).json({
        success: true,
        message: 'Table Inquiry Registered Successfully!',
        data: result
      });
    } catch (error) {
      next(error); // Passes to global Express v5 handler
    }
  }

  async fetchInquiries(req, res, next) {
    try {
      const data = await InquiryService.getAllInquiries();
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
}

export default new InquiryController();