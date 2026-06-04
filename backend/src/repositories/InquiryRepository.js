import { InquiryModel } from "../models/Inquiry.js";

class InquiryRepository {
  async create(inquiryData) {
    return await InquiryModel.create(inquiryData);
  }

  async getAll() {
    return await InquiryModel.find().sort({ createdAt: -1 });
  }
}

export default new InquiryRepository();