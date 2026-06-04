import mongoose from 'mongoose'


const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  guests: { type: Number, required: true },
  screenshotUrl: { type: String } // Uploaded via Cloudinary
}, { timestamps: true });
inquirySchema.index({ date: 1, name: 1 });
export const InquiryModel = mongoose.model('Inquiry', inquirySchema);