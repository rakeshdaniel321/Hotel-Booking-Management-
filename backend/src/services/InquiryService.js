import InquiryRepository from '../repositories/InquiryRepository.js';
import cloudinary from '../config/cloudinary.js';

class InquiryService {
  async processTableInquiry(data, fileBuffer) {
    let screenshotUrl = null;

    if (fileBuffer) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'urban_spoon'
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        stream.end(fileBuffer);
      });

      screenshotUrl = uploadResult.secure_url;
    }

    const inquiryData = {
      name: data.name,
      phone: data.phone,
      date: data.date,
      guests: Number(data.guests),
      screenshotUrl
    };

    return await InquiryRepository.create(inquiryData);
  }

  async getAllInquiries() {
    return await InquiryRepository.getAll();
  }
}

export default new InquiryService();  